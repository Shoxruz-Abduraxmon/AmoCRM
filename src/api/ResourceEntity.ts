import { IResourceEntity } from "../interfaces/api";
import EventEmitter from "../common/EventEmitter";
import ResourceFactory from "./ResourceFactory";
import { JSONObject } from "../types";

/**
 * Основной класс сущностей
 * */
export default abstract class ResourceEntity<T extends ResourceFactory<ResourceEntity<T>> extends EventEmitter implements IResourceEntity {
    protected readonly factory: T;
    public required: string[] = [];

    constructor(factory: T) {
        super();
        this.factory = factory;
    }

    /**
     * Возвращает все атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    abstract getAttributes(): JSONObject;

    /**
     * Устанавливает атрибуты сущности, которые должны синхронизироваться с порталом AmoCRM
     * */
    abstract setAttributes(attributes?: JSONObject): void;
}