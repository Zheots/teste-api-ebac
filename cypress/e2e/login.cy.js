/// <reference types="cypress" />

describe('Login', () => {

    it('Cadastrar um usuario INICIAL', () => {
        let nome = 'Fulano da Silva'
        let email = 'fulano@qa.com'
        let senha = 'teste'
        let administrador = 'true'
        cy.cadastrarUsuario(nome , email , senha , administrador)
      });

    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste" 
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            cy.log(response.body.authorization)
        })
    });

});
