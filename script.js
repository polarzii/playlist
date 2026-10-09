function montarItensDatocandoagora(tocando) {
    let itens = '';

    for (let i = 0; i < tocando.length; i++) {
        itens += `<li>${tocando[i]}</li>`;
    }

    return itens;
}

function montarTextoDaContagem(quantidade) {
    if (quantidade === 0) {
        return 'Nenhuma música na fila';
    }

    if (quantidade === 1) {
        return '1 música na fila';
    }

    return quantidade + ' músicas na fila';
}

function montarAvisoDoNovoNome(nome, tocandoagora) {
    if (nome === '') {
        return 'Escreva o nome da música.';
    }

    if (tocandoagora.some(
        musica => musica.toLowerCase() === nome.toLowerCase()
    )) {
        return nome + ' já está na lista.';
    }

    return '';
}

const cadastro = document.querySelector('.cadastro');
const campoNome = document.querySelector('.campo-nome');
const aviso = document.querySelector('.aviso');

const botaoTocarDepois = document.querySelector('.botao-tocar-depois');
const botaoRemover = document.querySelector('.botao-remover');
const botaoDesfazerUltima = document.querySelector('.botao-desfazer-ultima');
const botaoChamar = document.querySelector('.botao-chamar');

const telaContagem = document.querySelector('.contagem');
const telaLista = document.querySelector('.lista');
const telaMusicaAtual = document.querySelector('.musica-atual');


const tocando = {
    agora: ['Hard drive', 'Cemetery drive', 'Helena'],
    musicaAtual: '',
    historico: []
};

function guardarEstado() {
    tocando.historico.push({
        agora: [...tocando.agora],
        musicaAtual: tocando.musicaAtual
    });
}

function mostrartocandoagora() {
    telaLista.innerHTML = montarItensDatocandoagora(tocando.agora);

    telaContagem.textContent =
        montarTextoDaContagem(tocando.agora.length);

    telaMusicaAtual.textContent =
        tocando.musicaAtual || 'Nada tocando';
}

function lerNome() {
    return campoNome.value.trim();
}

function limparCampo() {
    campoNome.value = '';
}


mostrartocandoagora();

campoNome.addEventListener('input', function () {
    aviso.textContent = '';
});


cadastro.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nome = lerNome();
    aviso.textContent = montarAvisoDoNovoNome(nome, tocando.agora);

    if (aviso.textContent !== '') {
        return;
    }

    guardarEstado();
    tocando.agora.push(nome);

    limparCampo();
    mostrartocandoagora();
    aviso.textContent = 'Música adicionada ao fim!';
});

/* Tocar depois da música atual */

botaoTocarDepois.addEventListener('click', function () {
    const nome = lerNome();
    aviso.textContent = montarAvisoDoNovoNome(nome, tocando.agora);

    if (aviso.textContent !== '') {
        return;
    }

    guardarEstado();


    tocando.agora.unshift(nome);

    limparCampo();
    mostrartocandoagora();
    aviso.textContent = 'Música adicionada para tocar em seguida!';
});

/* Próxima música */

botaoChamar.addEventListener('click', function () {
    if (tocando.agora.length === 0) {
        aviso.textContent = 'Não há músicas na fila.';
        return;
    }

    guardarEstado();

    tocando.musicaAtual = tocando.agora.shift();

    mostrartocandoagora();
    aviso.textContent = 'Agora tocando: ' + tocando.musicaAtual;
});

/* Remover música*/

botaoRemover.addEventListener('click', function () {
    const nome = lerNome();

    if (nome === '') {
        aviso.textContent = 'Escreva o nome da música que deseja remover.';
        return;
    }

    const posicao = tocando.agora.findIndex(
        musica => musica.toLowerCase() === nome.toLowerCase()
    );

    if (posicao === -1) {
        aviso.textContent = nome + ' não está na fila.';
        return;
    }

    guardarEstado();
    tocando.agora.splice(posicao, 1);

    limparCampo();
    mostrartocandoagora();
    aviso.textContent = nome + ' foi removida da fila.';
});

/* Desfazer última ação*/

botaoDesfazerUltima.addEventListener('click', function () {
    if (tocando.historico.length === 0) {
        aviso.textContent = 'Não há ações para desfazer.';
        return;
    }

    const anterior = tocando.historico.pop();

    tocando.agora = anterior.agora;
    tocando.musicaAtual = anterior.musicaAtual;

    mostrartocandoagora();
    aviso.textContent = 'Última ação desfeita!';
});