import UserService from "../../services/UserService";

describe('Testando a UserService.getAuthUser', () => {

  it('Deve retornar o usuário autenticado', async () => {
    const userId = 1;

    await expect(UserService.getAuthUser(userId)).resolves.toHaveProperty('id', userId);
  });

  it('Deve lançar NotFoundError se o usuário não for encontrado', async () => { 
    const userId = 9999;

    await expect(UserService.getAuthUser(userId)).rejects.toThrow("Usuário não encontrado");
  });

});

describe('Testando a UserService.updateAuthUser', () => {

  it('Deve lançar NotFoundError se o usuário não for encontrado', async () => { 
    const userId = 9999;

    await expect(UserService.getAuthUser(userId)).rejects.toThrow("Usuário não encontrado");
  });

  it('Deve atualizar os dados do usuário autenticado', async () => {
    const userId = 14;
    const newName = 'Nome Atualizado';
    
    const response = await UserService.updateAuthUser(newName, userId);
    await expect(response).toHaveProperty('message', 'Usuário atualizado com sucesso');
  });

});
