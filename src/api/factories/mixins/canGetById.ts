import { TFactoryConstructor } from "../../../types";
import { IEntityAttributes, IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { IRequestOptions } from "../../../interfaces/common";

export interface IGetByIdCriteria {
    with?: string;
}

export interface ICanGetByIdFactory<T extends IResourceEntity<IResourceFactory<T>>> extends IResourceFactory<T> {
    getById(identity: number, criteria?: IGetByIdCriteria, options?: IRequestOptions<IEntityAttributes>): Promise<T|null>;
}

export function canGetById<T extends IResourceEntity<IResourceFactory<T>>>(Base: TFactoryConstructor<T>): TFactoryConstructor<T> {
    return class CanGetById extends Base implements ICanGetByIdFactory<T> {
        async getById(identity: number, criteria?: IGetByIdCriteria, options?: IRequestOptions<IEntityAttributes>) {
            const url = this.getUrl('/' + identity);
            const { data } = await this.getRequest().get(url, criteria, options);
            if (!data) {
                return null;
            }
            const instance = this.createEntity();

            instance.setAttributes(data);
            this.emit('getById');
            return instance;
        }
    };
}