
function montarItensDatocandoagora(tocando) {
    let itens = '';
    for (let i = 0; i < tocando.length; i++) {
        itens = itens + `<li>${tocando[i]}</li>`;
    }
    return itens;
}

function montarTextoDaContagem(quantidade) {
    if (quantidade === 0) {
        return 'Nenhuma musica na fila';
    }
    if (quantidade === 1) {
        return '1 musica na fila';
    }
    return quantidade + ' musicas na fila';
}

// Devolve o problema do nome novo, ou '' se estiver tudo certo.
function montarAvisoDoNovoNome(nome, tocandoagora) {
    if (nome === '') {
        return 'Escreva o nome.';
    }
    if (tocando.agora.includes(nome)) {
        return nome + ' já está na lista.';
    }
    return '';
}


/* -----------------------------------------------------------
   Selecionar e lembrar
   ----------------------------------------------------------- */

const cadastro = document.querySelector('.cadastro');
const campoNome = document.querySelector('.campo-nome');
const aviso = document.querySelector('.aviso');

const botaoadicionaraofim = document.querySelector('.botao-adicionar-ao-fim');
const botaoTocarDepois = document.querySelector('.botao-tocar-depois');
const botaoRemover = document.querySelector('.botao-remover');
const botaoDesfazerUltima = document.querySelector('.botao-desfazer-ultima');


const telaContagem = document.querySelector('.contagem');
const telaNomeChamado = document.querySelector('.nome-chamado');
const telaLista = document.querySelector('.lista');

// Começa com três pessoas, para já ter o que ver.
const tocando = {
    agora: ['Ana', 'Bruno', 'Carla']
};


/* -----------------------------------------------------------
   Funções que mexem na tela
   ----------------------------------------------------------- */

// Redesenha a lista inteira a partir do array.
// Toda operação na lista termina chamando esta função.
function mostrartocandoagora() {
    telaLista.innerHTML = montarItensDatocandoagora(tocando.agora);
    telaContagem.textContent = montarTextoDaContagem(tocando.agora.length);
}

function lerNome() {
    return campoNome.value.trim();
}

function limparCampo() {
    campoNome.value = '';
}

mostrartocandoagora();


/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

// input: começou a digitar de novo, o aviso antigo sai.
campoNome.addEventListener('input', function () {
    aviso.textContent = '';
});

// push: entra no fim
cadastro.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = lerNome();
    aviso.textContent = montarAvisoDoNovoNome(nome, tocando.agora);

    if (aviso.textContent === '') {
        tocando.agora.push(nome);
        limparCampo();
        mostrartocandoagora();
    }
});

// unshift: entra no começo, é o próximo a ser chamado
botaoadicionaraofim.addEventListener('click', function () {
    const nome = lerNome();
    aviso.textContent = montarAvisoDoNovoNome(nome, tocando.agora);

    if (aviso.textContent === '') {
        tocando.agora.unshift(nome);
        limparCampo();
        mostrartocandoagora();
    }
});

// shift: sai do começo, e devolve quem saiu
botaoChamar.addEventListener('click', function () {
    if (tocando.agora.length === 0) {
        aviso.textContent = 'Não tem ninguém esperando.';
    } else {
        telaNomeChamado.textContent = tocando.agora.shift();
        aviso.textContent = '';
        mostrartocandoagora();
    }
});

// pop: sai do fim, e também devolve quem saiu
botaoDesfazer.addEventListener('click', function () {
    if (tocando.agora.length === 0) {
        aviso.textContent = 'Não tem ninguém esperando.';
    } else {
        const removido = tocando.agora.pop();
        aviso.textContent = removido + ' saiu da lista.';
        mostrartocandoagora();
    }
});

// indexOf + splice: acha a posição e tira dali
botaoDesistiu.addEventListener('click', function () {
    const nome = lerNome();
    const posicao = tocando.agora.indexOf(nome);

    if (nome === '') {
        aviso.textContent = 'Escreva o nome.';
    } else if (posicao === -1) {
        aviso.textContent = nome + ' não está na lista.';
    } else {
        tocando.agora.splice(posicao, 1);
        aviso.textContent = nome + ' desistiu.';
        limparCampo();
        mostrartocandoagora();
    }
});
