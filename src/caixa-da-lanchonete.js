class CaixaDaLanchonete {

    // Definição do menu com os itens e seus preços
    menu = [
        ["cafe", 3.0],
        ["chantily", 1.5],
        ["suco", 6.2],
        ["sanduiche", 6.5],
        ["queijo", 2.0],
        ["salgado", 7.25],
        ["combo1", 9.5],
        ["combo2", 7.5]
    ]

    // Métodos de pagamento aceitos
    metodos = [
        "dinheiro",
        "debito",
        "credito"
    ]

    // Verifica se o método de pagamento é válido
    verificaMetodoPagamento(metodoDePagamento) {
        if (!this.metodos.includes(metodoDePagamento)) {
            return false;
        }
        return true;
    }

    // Verifica se a quantidade de itens é válida
    verificaTamanhoItens(itens) {
        let passou = true;
        itens.forEach(item => {
            if (item[1] <= 0) {
                passou = false;
            }
        });
        return passou;
    }

    // Verifica se há itens no carrinho
    verificaQntItens(itens) {
        if (itens.length === 0) {
            return false;
        }
        return true;
    }

    // Separa uma string em array usando vírgula como separador
    separarPorVirgula(array) {
        const novoArray = array.map(item => item.split(','));
        return novoArray;
    }

    // Converte os valores numéricos de strings para inteiros
    transformarEmInteiro(array) {
        const novoArray = array.map(item => {
            item[1] = parseInt(item[1], 10)
            return item;
        });
        return novoArray;
    }

    // Organiza os itens do carrinho (trabalha entrada)
    organizarItens(itens) {
        itens = this.transformarEmInteiro(this.separarPorVirgula(itens));
        return itens;
    }

    // Verifica se todos os itens pedidos estão no menu
    verificaItensPedidos(itens) {
        let passouTodos = true;
        itens.forEach(item => {
            let passou = false;
            this.menu.forEach(menuItem => {
                if (item[0] === menuItem[0]) {
                    passou = true;
                }
            });
            if (!passou) {
                passouTodos = false;
            }
        });
        return passouTodos;
    }

    // Verifica se um item extra tem o item principal correspondente
    verificaItemExtra(itens) {
        let passou = true;
        itens.forEach(item => {
            if (item[0] === "chantily") {
                if (!this.verificaExtra(itens, "cafe")) {
                    passou = false;
                }
            }
            if (item[0] === "queijo") {
                if (!this.verificaExtra(itens, "sanduiche")) {
                    passou = false;
                }
            }
        });
        return passou;
    }

    // Verifica se um item extra foi pedido
    verificaExtra(itens, item) {
        let passou = false;
        itens.forEach(itemAtual => {
            if (itemAtual[0] === item) {
                passou = true;
            }
        });
        return passou;
    }

    // Calcula o valor total da compra com base nos itens e no método de pagamento
    valorItens(itens, metodoDePagamento) {
        let subtotal = 0;
        itens.forEach(item => {
            this.menu.forEach(menuItem => {
                if (item[0] === menuItem[0]) {
                    subtotal += menuItem[1] * item[1];
                }
            });
        });
        if (metodoDePagamento === 'dinheiro') {
            return subtotal - subtotal * 0.05;
        } else if (metodoDePagamento === 'credito') {
            return subtotal + subtotal * 0.03;
        }
        return subtotal;
    }

    // Verifica a entrada se tudo tiver ok calcula valor total da compra
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.verificaMetodoPagamento(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        if (!this.verificaQntItens(itens)) {
            return "Não há itens no carrinho de compra!";
        }

        itens = this.organizarItens(itens);

        if (!this.verificaTamanhoItens(itens)) {
            return "Quantidade inválida!";
        }

        if (!this.verificaItensPedidos(itens)) {
            return "Item inválido!";
        }

        if (!this.verificaItemExtra(itens)) {
            return "Item extra não pode ser pedido sem o principal";
        }

        return "R$ " + (this.valorItens(itens, metodoDePagamento).toFixed(2)).replace(".", ",");
    }
}

export { CaixaDaLanchonete };
