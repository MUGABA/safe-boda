"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInstanceFactory = void 0;
const request_dto_1 = require("../../requests/dtos/request.dto");
class RequestInstanceFactory {
    static new(dataSource) {
        const factory = new RequestInstanceFactory();
        factory.dataSource = dataSource;
        return factory;
    }
    async create(request) {
        const requestRepository = this.dataSource.getRepository(request_dto_1.RequestDto);
        return requestRepository.save(request);
    }
}
exports.RequestInstanceFactory = RequestInstanceFactory;
//# sourceMappingURL=requestInstance.factory.js.map