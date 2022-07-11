import { IResourceEntity, IResourceFactory } from "../../../interfaces/api";
import { TConstructor } from "../../../types";
import { IRequestOptions } from "../../../interfaces/common";
import { ICanCreateFactory } from "../../factories/mixins/canCreate";
import { ICanUpdateFactory } from "../../factories/mixins/canUpdate";
import { IHasCreateEntity } from "./hasCreate";
import { IHasUpdateEntity } from "./hasUpdate";

export type IHasCreateAndUpdateFactory<T extends IResourceEntity<IResourceFactory<T>>> = ICanCreateFactory<T> & ICanUpdateFactory<T>;

export type IHasCreateAndUpdateEntity<T extends IResourceFactory<IResourceEntity<T>>> = IHasCreateEntity<T> & IHasUpdateEntity<T>;

export interface IHasSaveEntity<T extends IResourceFactory<IResourceEntity<T>>> extends IResourceEntity<T>, IHasCreateAndUpdateEntity<T> {
    save(options?: IRequestOptions): Promise<T|false>;
}

export function hasSave<T extends IHasCreateAndUpdateFactory<IHasCreateAndUpdateEntity<T>>>
    (Base: TConstructor<IHasCreateAndUpdateEntity<T>>): TConstructor<IHasCreateAndUpdateEntity<T>>
{
    return class HasSave extends Base {
        save(options?: IRequestOptions) {
            if (this.isNew()) {
                return this.create(options);
            }
            return this.update(options);
        }
    };
}