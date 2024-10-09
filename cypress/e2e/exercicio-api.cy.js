/// <reference types="cypress" />
import contratoUsuarios from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
  let token
  beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      return contratoUsuarios.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.body).to.have.property('usuarios')
      expect(response.status).to.equal(200)
    })
    
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let nome = 'USUARIO TESTE'
    let email = 'TESTE' + Math.floor(Math.random() *9999) + '@qa.com.br'
    let senha = 'teste'
    let administrador = 'true'
    cy.cadastrarUsuario(nome , email , senha , administrador)
      .then((response) =>{
        expect(response.status).equal(201),
        expect(response.body.message).equal('Cadastro realizado com sucesso')
      })
     
  });

  it('Deve validar um usuário com email inválido', () => {
    let nome = 'Fulano da Silva'
    let email = 'beltrano@qa.com.br'
    let senha = 'teste'
    let administrador = 'true'
    cy.cadastrarUsuario(nome , email , senha , administrador)
      .then((response) =>{
        expect(response.status).equal(400),
        expect(response.body.message).equal('Este email já está sendo usado')
      })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'PUT',
      url: 'usuarios/0uxuPY0cbmQhpEz1',
      body: {
        "nome": "Fulano da Silva",
        "email": 'TESTE' + Math.floor(Math.random() *9999) + '@qa.com.br',
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body.message).equal('Registro alterado com sucesso')
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario('Usuario a ser deletado' , 'delete@email.com' , 'sennha' , 'false')
      .then((response) =>{
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
          headers: {authorization: token}
        }).should((response) =>{
          expect(response.status).equal(200)
          expect(response.body.message).equal('Registro excluído com sucesso')
        })
      })
  });

});
