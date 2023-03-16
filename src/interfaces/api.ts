import { IClientRequest } from "../common/ClientRequest";
import { JSONObject, TConstructor } from "../types";
import { IRequestOptions } from "./common";
import { IEventEmitter } from "../common/EventEmitter";
import { EventEmitter } from "events";
import { IClient } from "../Client";
import { IEntityConstructors } from "../api/activeRecords";
import { IFactoryConstructors } from "../api/factories";

export interface IClientConstructors {
    entities: IEntityConstructors;
    factories: IFactoryConstructors
}

export interface IResourceFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IEventEmitter {
    getClient(): IClient;
    getEntityClass(): TConstructor<T>;
    createEntity(): T;
    from(attributes?: IEntityAttributes): T;
    getRequest(): IClientRequest;
    getEmbeddedKey(): string;
    getEmbedded<A extends IEntityAttributes>(data: ICollectionResponse<A>): A[];
    getUrl(path?: string): string;
    getEntityCriteria(criteriaData: (object)[]): IEntityAttributes[];
}

export interface IResourceEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IEventEmitter {
    id?: number;
    updated_at?: number;
    isNew(): boolean;
    getFactory(): T;
    getAttributes(): IEntityAttributes;
    setAttributes(attributes?: IEntityAttributes): void;
}

export interface IResourceEntityConstructor<T> {
    from(request: IClientRequest, attributes?: JSONObject): T;
}

export interface ISelfResponse {
    id: number;
    updated_at: number;
    _links: {
        href: string
    }
}

export interface ICollectionResponse<T> {
    _links: {
        href: string
    }
    _embedded: {
        [index: string]: T[]
    };
}

export interface IPaginationLinks {
    current?: string;
    next?: string;
    prev?: string;
    first?: string;
}

export interface IResourcePaginationParams<T extends IResourceEntity<IResourceFactory<T>>> {
    url: string;
    criteria?: object;
    factory: IResourceFactory<T>;
    embedded: string;
    options?: IRequestOptions;
}

export interface ILinkResponse {
    href: string
}

export interface IPaginatedResponse {
    _page: number;
    _links: {
        self?: ILinkResponse;
        next?: ILinkResponse;
        first?: ILinkResponse;
        prev?: ILinkResponse;
    }
    _embedded: {
        [index: string]: IEntityAttributes[]
    };
}

export interface IEntityAttributes {
    id?: number;
}
