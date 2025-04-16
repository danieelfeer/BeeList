"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require('supertest');
const app = require('../app');
describe('Teste de Login', () => {
    it('Deve realizar login com credenciais válidas', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/login')
            .send({
            email: 'usuario@email.com',
            senha: 'Senha123',
        });
        expect(response.status).toBe(200); // Espera-se um status de sucesso
        expect(response.body.message).toBe('Login realizado com sucesso!');
    }));
    it('Não deve realizar login com credenciais inválidas', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/login')
            .send({
            email: 'usuario@email.com',
            senha: 'SenhaErrada',
        });
        expect(response.status).toBe(401); // Espera-se um status de não autorizado
        expect(response.body.message).toBe('Usuário não encontrado.');
    }));
});
