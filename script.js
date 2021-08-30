//Validação cpf
const cpf = document.getElementById('cpf').value;

const validarCpf = () => {
    if (document.getElementById('cpf').value.length === 11) {
        return true
    } else {
        return false
    }
}

const mostrarErroCpf = (cpf) => {
    const validacao = validarCpf(cpf);
    console.log(validacao)
    if (validacao === true) {
        document.getElementById('wrongCpf').style.display = 'none';
    } else {
        document.getElementById('wrongCpf').style.display = 'inline';
    }
}

document.getElementById('cpf').addEventListener('focusout', mostrarErroCpf)

// Validação Cep
const validarCep = (cep) => /^[0-9]+$/.test(cep);

const cepValido = (cep) => cep.length == 8 && validarCep(cep);

const buscarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('zipCode').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('wrongCep').style.display = 'inline';

        } else {
            preencherFormulario(endereco);
            document.getElementById('wrongCep').style.display = 'none';
        }
    } else {
        document.getElementById('wrongCep').style.display = 'inline';
    }

}

const limparFormulario = () => {
    document.getElementById('address').value = "";
    document.getElementById('neighborhood').value = "";
    document.getElementById('city').value = "";
    document.getElementById('uf').value = "";
}

const preencherFormulario = (endereco) => {
    document.getElementById('address').value = endereco.logradouro;
    document.getElementById('neighborhood').value = endereco.bairro;
    document.getElementById('city').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
}

document.getElementById('zipCode').addEventListener('blur', buscarCep)