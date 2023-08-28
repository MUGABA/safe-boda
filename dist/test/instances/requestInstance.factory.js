"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInstanceFactory = void 0;
const request_entity_1 = require("../../models/request.entity");
class RequestInstanceFactory {
    static new(dataSource) {
        const factory = new RequestInstanceFactory();
        factory.dataSource = dataSource;
        return factory;
    }
    async create(request) {
        const requestRepository = this.dataSource.getRepository(request_entity_1.Requests);
        return requestRepository.save(request);
    }
}
exports.RequestInstanceFactory = RequestInstanceFactory;
//# sourceMappingURL=requestInstance.factory.js.map