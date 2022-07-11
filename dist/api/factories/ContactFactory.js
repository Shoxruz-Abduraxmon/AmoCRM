"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContactFactory = void 0;
const tslib_1 = require("tslib");
const ResourceFactory_1 = tslib_1.__importDefault(require("../ResourceFactory"));
const Contact_1 = tslib_1.__importDefault(require("../activeRecords/Contact"));
const v4_1 = tslib_1.__importDefault(require("../../schema/v4"));
const hasGetByCriteria_1 = require("./mixins/hasGetByCriteria");
const hasGetById_1 = require("./mixins/hasGetById");
const util_1 = require("../../util");
const hasCreate_1 = require("./mixins/hasCreate");
const hasUpdate_1 = require("./mixins/hasUpdate");
/**
 * Фабрика управления контактами
 * */
class BaseContactFactory extends ResourceFactory_1.default {
    getEntityClass() {
        return new Contact_1.default(this);
    }
    getBaseUrl() {
        return v4_1.default.entities.contacts.path;
    }
    getEmbeddedKey() {
        return 'contacts';
    }
}
exports.BaseContactFactory = BaseContactFactory;
const ContactFactory = (0, util_1.applyMixins)(BaseContactFactory, [
    hasGetByCriteria_1.hasGetByCriteria,
    hasGetById_1.hasGetById,
    hasCreate_1.hasCreate,
    hasUpdate_1.hasUpdate
]);
exports.default = ContactFactory;
//# sourceMappingURL=ContactFactory.js.map