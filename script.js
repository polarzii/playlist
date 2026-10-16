function montarTextoDaContagem(quantidade) {
    if (quantidade === 0) {
        return 'nada na fila';
    }

    if (quantidade === 3) {
        return '3 música na fila';
    }

    return quantidade + ' músicas na fila';
}

function montarAvisoDaMusica(musica, fila) {
    if (musica === '') {
        return 'Escreva o nome da música.';
    }

    if (fila.includes(musica)) {
        return musica + ' já está na fila.';
    }

    return '';
}

const formulario = document.querySelector('.formulario');
const campoMusica = document.querySelector('.campo-musica');
const aviso = document.querySelector('.aviso');

const telaContagem = document.querySelector('.contagem');
const telaLista = document.querySelector('.lista');
const telaMusicaAtual = document.querySelector('.musica-atual');
const telaTocadas = document.querySelector('.lista-tocadas');

const botaoProxima = document.querySelector('.botao-proxima');


const iconeRemover = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 6 L18 18 M18 6 L6 18"
              stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>`;

// Músicas que ainda vão tocar.
const fila = ['Hard Drive', 'Cemetery Drive', 'Helena'];

// Músicas que já tocaram.
const tocadas = [];

function criarItemDaFila(musica, posicao) {
    const item = document.createElement('li');

    const textoDaMusica = document.createElement('span');
    textoDaMusica.textContent = musica;

    const botaoRemover = document.createElement('button');
    botaoRemover.type = 'button';
    botaoRemover.classList.add('botao-remover');

    botaoRemover.innerHTML = iconeRemover;

    botaoRemover.setAttribute(
        'aria-label',
        'Remover ' + musica + ' da fila'
    );

    botaoRemover.addEventListener('click', function () {
        fila.splice(posicao, 1);

        aviso.textContent = musica + ' foi removida da fila.';

        renderizar();
    });

    item.appendChild(textoDaMusica);

    // A primeira música é a próxima a tocar.
    if (posicao === 0) {
        const etiqueta = document.createElement('span');

        etiqueta.textContent = 'a seguir';
        etiqueta.classList.add('etiqueta');

        item.appendChild(etiqueta);
    }

    item.appendChild(botaoRemover);

    return item;
}

function criarItemTocado(musica) {
    const item = document.createElement('li');

    item.textContent = musica;

    return item;
}

function renderizar() {

    
    telaLista.innerHTML = '';

    for (let i = 0; i < fila.length; i++) {
        telaLista.appendChild(criarItemDaFila(fila[i], i));
    }

    telaTocadas.innerHTML = '';

    for (let i = 0; i < tocadas.length; i++) {
        telaTocadas.appendChild(criarItemTocado(tocadas[i]));
    }

    if (tocadas.length === 0) {
        telaMusicaAtual.textContent = 'Nada tocando';
    } else {
        telaMusicaAtual.textContent = tocadas[tocadas.length - 1];
    }

    telaContagem.textContent = montarTextoDaContagem(fila.length);

    botaoProxima.disabled = fila.length === 0;
}

function lerMusica() {
    return campoMusica.value.trim();
}

function limparCampo() {
    campoMusica.value = '';
}

renderizar();

campoMusica.addEventListener('input', function () {
    aviso.textContent = '';
});

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const musica = lerMusica();

    aviso.textContent = montarAvisoDaMusica(musica, fila);

    if (aviso.textContent === '') {
        fila.push(musica);

        limparCampo();

        renderizar();
    }
});

botaoProxima.addEventListener('click', function () {
    tocadas.push(fila.shift());

    aviso.textContent = '';

    renderizar();
});

