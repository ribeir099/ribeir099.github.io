const cores = document.getElementsByClassName('color');
let board = 5;
let pixelBoard = document.getElementById('pixel-board');
const clean = document.querySelector('#clear-board');
const pixels = document.getElementsByClassName('pixel');
const buttonSize = document.getElementById('generate-board');
const size = document.getElementById('board-size');
const conteudo = document.getElementById('conteudo');
const paletaCores = ['black', '#', '#', '#'];

for (let index = 1; index < paletaCores.length; index += 1) {
  while (paletaCores[index].length < 7) {
    paletaCores[index] += Math.floor(Math.random() * 0x10).toString(16);
  }
}

for (let index = 0; index < cores.length; index += 1) {
  const cor = cores[index];
  cor.id = paletaCores[index];
  cor.style.backgroundColor = cor.id;
}

function criaLinha(linha) {
  for (let index = 0; index < board; index += 1) {
    const line = document.createElement('div');
    line.className = 'line';
    linha.appendChild(line);
  }
}

criaLinha(pixelBoard);

let lines = document.querySelectorAll('.line');

function criaPixel(divLine) {
  for (let index = 0; index < board; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    divLine.appendChild(pixel);
  }
}

function criaColuna(coluna) {
  for (let index = 0; index < coluna.length; index += 1) {
    criaPixel(lines[index]);
  }
}

criaColuna(lines);

function color(event) {
  const selected = document.querySelector('.selected');
  const tinta = selected.id;
  const pixel = event.target;
  pixel.style.backgroundColor = tinta;
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('pixel')) {
    color(event);
  }
}, false);

function changeColor(event) {
  const selecao = event.target;
  const corAnterior = document.querySelector('.selected');
  corAnterior.classList.remove('selected');
  selecao.classList.add('selected');
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('color')) {
    changeColor(event);
  }
}, false);

function limpar() {
  for (let index = 0; index < pixels.length; index += 1) {
    const quadrado = pixels[index];
    quadrado.style.backgroundColor = 'white';
  }
}

clean.addEventListener('click', limpar);

function sizeBoard() {
  let tamanho = size.value;
  if (tamanho < 5) {
    tamanho = 5;
  } else if (tamanho > 50) {
    tamanho = 50;
  }
  board = tamanho;
}

size.addEventListener('change', sizeBoard);

function createBoard() {
  if (size.value === '') {
    alert('Board inválido!');
  } else {
    pixelBoard.parentNode.removeChild(pixelBoard);
    pixelBoard = document.getElementById('pixel-board');
    if (pixelBoard === null) {
      const borda = document.createElement('div');
      borda.id = 'pixel-board';
      conteudo.appendChild(borda);
      pixelBoard = document.getElementById('pixel-board');
      criaLinha(pixelBoard);
      lines = document.querySelectorAll('.line');
      criaColuna(lines);
    }
  }
}

buttonSize.addEventListener('click', createBoard);
