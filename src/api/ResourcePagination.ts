import ClientRequest from "../common/ClientRequest";
import {
    IPaginatedResponse,
    IPaginationLinks,
    IResourcePagination,
    IResourcePaginationParams
} from "../interfaces/api";

/**
 * Постраничная навигация вывода сущностей
 * */
export default class ResourcePagination<T> implements IResourcePagination<T> {
    protected readonly request: ClientRequest;
    protected readonly params: IResourcePaginationParams<T>;
    protected data: T[] = [];
    protected links: IPaginationLinks = {};
    protected page = 1;

    constructor(request: ClientRequest, params: IResourcePaginationParams<T>) {
        this.request = request;
        this.params = params;
    }

    /**
     * Загружает данные первой страницы
     * */
    fetch() {
        return this.fetchUrl(this.params.url);
    }

    /**
     * Делает запрос на получение данных по заданному адресу
     * @param url адрес запроса
     * */
    protected async fetchUrl(url: string) {
        const { criteria, options } = this.params;
        const apiResponse = await this.request.get(url, criteria, options);
        const data: IPaginatedResponse = apiResponse.data;
        this.page = data?._page || 1;
        this.parseData(data);
        this.parseLinks(data);
        return this;
    }

    /**
     * @returns есть ли следующая страница
     * */
    hasNext() {
        return this.links.next !== undefined;
    }

    /**
     * @returns есть ли возможность загрузки первой страницы
     * */
    hasFirst() {
        return this.links.first !== undefined;
    }

    /**
     * @returns есть ли предыдущая страница
     * */
    hasPrev() {
        return this.links.prev !== undefined;
    }

    /**
     * Загружает данные следующей страницы, если это возможно
     * */
    async next() {
        if (!this.hasNext()) {
            return false;
        }
        return await this.fetchUrl(<string>this.links.next);
    }

    /**
     * Загружает данные первой страницы, если это возможно
     * */
    async first() {
        if (!this.hasFirst()) {
            return false;
        }
        return await this.fetchUrl(<string>this.links.first);
    }

    /**
     * Загружает данные предыдущей страницы, если это возможно
     * */
    async prev() {
        if (!this.hasPrev()) {
            return false;
        }
        return await this.fetchUrl(<string>this.links.prev);
    }

    /**
     * Обрабатывает объект ссылок на первую, предыдущую и следущие страницы
     * */
    protected parseLinks(response?: IPaginatedResponse) {
        const links = response?._links || {};
        this.links = {
            next: links.next?.href,
            prev: links.prev?.href,
            first: links.first?.href
        };
        return this;
    }

    /**
     * Преобразовывает массив атрибутов сущностей в объекты-сущностей
     * */
    protected parseData(response?: IPaginatedResponse) {
        const { embedded, factory } = this.params;
        const data: any = response?._embedded[embedded] || [];
        if (!Array.isArray(data)) {
            return;
        }
        this.data = data.map(attributes => {
            return factory.from(attributes);
        });
        return this;
    }

    /**
     * Возвращает номер текущей страницы
     * */
    getPage() {
        return this.page;
    }

    /**
     * Возвращает массив сущностей на текущей странице
     * */
    getData() {
        return this.data;
    }
}