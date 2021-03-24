describe('Calculadora de imposto', () => {
    it('deve limpar os campos', () => {
        cy.visit('https://andreendo.github.io/sample-ui-compras/index-2.html');
        cy.get('[name=nome]').type('William');
        cy.get('[name=idade]').type('26');
        cy.get('[name=sexo]').select('F');
        cy.get('[name=salario]').type('3000');
        cy.get(`[value='Limpar campos']`).click();

        cy.get('[name=nome]').should('have.text', '');
        cy.get('[name=idade]').should('have.text', '');
        cy.get('[name=sexo]').should('have.value', '-');
        cy.get('[name=salario]').should('have.text', '');
    });

    it('deve calcular o imposto devido', () => {
        // preencha todos os campos
        cy.visit('https://andreendo.github.io/sample-ui-compras/index-2.html');
        cy.get('[name=nome]').type('John');
        cy.get('[name=idade]').type('20');
        cy.get('[name=sexo]').select('M');
        cy.get('[name=salario]').type('2000');
       
        // clique no botao calcular
        cy.get(`[value='Calcular']`).click();

        // verifique (usando .should) a saída retornada com o calculo do imposto devido
        cy.get('[name=salario]')
        .then(value => value.val())
        .then( salario => {
            let valor = "";
            if(salario > 5000){
                valor = salario * 0.25;
            }else{
                valor = salario * 0.15
            }
            
            cy.get('[id=divValorImposto]').should('have.text', 'Valor a pagar de imposto: ' + valor);
        });
    });
});