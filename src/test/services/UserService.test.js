import UserService from "../../services/UserService";
import UserRepository from "../../repository/UserRepository";

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
