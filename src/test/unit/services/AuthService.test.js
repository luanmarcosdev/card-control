import AuthService from '../../../services/AuthService';
import UserRepository from '../../../repository/UserRepository';

describe('Testando a AuthService.register', () => {

  it('O e-mail deve ser único', async () => {
    
    const userMock = {
      name: 'Luan Teste',
      email: 'user@example.com',
      password: 'senha123'
    };

    await expect(AuthService.register(userMock)).rejects.toThrow("E-mail já cadastrado");
  });

  it('Deve cadastrar um novo usuário com sucesso', async () => {

    const userMock = {
      name: 'Luan Teste',
      email: 'luantest@example.com',
      password: 'senha123'
    };

    await expect(AuthService.register(userMock)).resolves.toHaveProperty('id');
  });

  it('Usuario deve passar name, email e password para se registrar', async () => {

    const userMock = {
      name: 'Luan Teste',
      password: 'senha123'
    };

    await expect(AuthService.register(userMock)).rejects.toThrow("name, email e password são obrigatórios");
  });

});

describe('Testando a AuthService.login', () => {

  it('Usuario deve passar email e password para fazer login', async () => {

    const userMock = {
      email: 'luantest@example.com'
    };

    await expect(AuthService.login(userMock)).rejects.toThrow("email e password são obrigatórios");
  });

  it('Deve falhar ao fazer login com credenciais inválidas', async () => {

    const userMock = {
      email: 'luantest@example.com',
      password: 'senha12345'
    };

    await expect(AuthService.login(userMock)).rejects.toThrow("Credenciais inválidas");
  });

  it('Deve fazer login com sucesso', async () => {

    const userMock = {
      email: 'luantest@example.com',
      password: 'senha123'
    };

    await expect(AuthService.login(userMock)).resolves.toHaveProperty('accessToken');
  });

  it('Deve falhar ao fazer login com usuário inexistente', async () => {

    const userMock = {
      email: 'testcomuserinexistente@example.com',
      password: 'senha123'
    };

    await expect(AuthService.login(userMock)).rejects.toThrow("Credenciais inválidas");
  });

});

afterAll(async () => {
  // Remove o usuário criado durante os testes
  await UserRepository.deleteByEmail('luantest@example.com');
});
