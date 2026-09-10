const form = document.getElementById('imc-form');
const resultado = document.getElementById('resultado');
const valorIMC= document.getElementById('valor-imc');
const categoriaIMC = document.getElementById('categoria-imc');
const marcador = document.getElementById('barra-marcador');

form.addEventListener('submit', function (e) {
    e.preventDefault();
const peso = parseFloat(document.getElementById('peso').value);
const altura = parseFloat(document.getElementById('altura').value);

if(!peso || !altura) return;

const imc = peso / (altura * altura);
const {categoria, posicao} = ClassificariMC(imc);

valorIMC.textContent = imc.toFixed(1);
categoriaIMC.textContent = categoria;
marcador.style.left = posicao + '%';

resultado.classList.remove('oculto');
});

function ClassificariMC(imc) {
    if (imc < 18.5) {
        return { categoria: 'Abaixo do peso', posicao: mapearFaixa(imc, 10, 18.5, 0, 18) };
    }
    if (imc < 25) {
        return { categoria: 'Peso normal', posicao: mapearFaixa(imc, 18.5, 25, 18, 55) };
    }
    if (imc < 30) {
        return { categoria: 'Sobrepeso', posicao: mapearFaixa(imc, 25, 30, 55, 75) };
    }
    return { categoria: 'Obesidade', posicao: mapearFaixa(imc, 30, 40, 75, 100) };
}

function mapearFaixa(valor, min, max, destMin, destMax) {
    const proporcao = Math.min(Math.max((valor - min) / (max - min), 0), 1);
    return destMin + proporcao * (destMax - destMin);
}

