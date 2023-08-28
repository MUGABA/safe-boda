"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInstanceFactory = void 0;
const user_entity_1 = require("../../models/user.entity");
const bcrypt = require("bcrypt");
class AuthInstanceFactory {
    static new(dataSource) {
        const factory = new AuthInstanceFactory();
        factory.dataSource = dataSource;
        return factory;
    }
    async create(user = {}) {
        const userRepository = this.dataSource.getRepository(user_entity_1.User);
        const salt = await bcrypt.genSalt();
        const password = await this.hashPassword(user.password, salt);
        const payload = {
            ...user,
            password,
        };
        return userRepository.save(payload);
    }
    hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
}
exports.AuthInstanceFactory = AuthInstanceFactory;
//# sourceMappingURL=authInstance.factory.js.map