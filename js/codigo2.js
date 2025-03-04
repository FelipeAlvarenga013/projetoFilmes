"use strict";

//import api from '../js/codigo.js'


const n11 = document.querySelector('#buscar').addEventListener('input',function(){
    
    sessionStorage.clear();
    sessionStorage.setItem('ch',this.value);
    window.history.back();
    this.focus();

    
})

//Evento de barra de pesquisa, Assim que aperta;


//Pegando dados da pagina principal;


const keyApi = 'api_key=fe926addb733eac566b4ba275de51a87';

//Busca pelo ID
const http1 = `https:api.themoviedb.org/3/movie/&append_to_response=videos&language=pt-BR`;

//Buscar pelo Nome do filme
const http2 = `https://api.themoviedb.org/3/search/movie?${keyApi}&language=pt-BR&query=carros 2`;


//Função assicrona

async function buscaApi() {
    //Buscando api do filmes
    console.log(localStorage.getItem('api'));
    //api buscada pelo nome do filme;
    const fetc1 = await fetch(`https://api.themoviedb.org/3/search/movie?${keyApi}&language=pt-BR&query=${localStorage.getItem('api')}`);
    //convertendo fetch em json();
    const json1 = await fetc1.json();
    
    //api buscada pelo ID do filme
    const fetc2 = await fetch(`https:api.themoviedb.org/3/movie/${json1.results[0].id}?${keyApi}&append_to_response=videos&language=pt-BR`);
    //convertendo fetch em json();
    const json2 = await fetc2.json();

    createElement1.call(json2);
    
}

buscaApi();

//Função para criar elementos no HTML;
function createElement1() {
    const addElementos = document.querySelector('#artFilho1');
    const addElementos2 = document.querySelector('#artFilho2');
    
    //Elementos para ser criados e adicionado na pagina;
    const elementos = {
        img1:document.createElement('img'),
        h2:document.createElement('h2'),
        i:document.createElement('i'),
    }
    //Adicionando foto;
    elementos.img1.setAttribute('src',`https://image.tmdb.org/t/p/w500/${this.poster_path}`);
    addElementos.appendChild(elementos.img1);
    
    //Adicionando h2 nome do filme;
    elementos.h2.textContent=this.original_title;
    addElementos.appendChild(elementos.h2);
    
    
    //Addicionando elementos p(paragrafos) no article#artFilho1;
    for(let n1 = 0;n1<3;n1++) {
        const p1 = document.createElement('p')
        addElementos.appendChild(p1);
    };
    //Primeiro Elemento p(Paragrafo);
    //Adicionando voto de pontuação;
    elementos.i.setAttribute('class','fa-solid fa-star');
    elementos.i.textContent=this.vote_average.toFixed(1)
    const paragrafos = document.querySelectorAll('#artFilho1>p');
    paragrafos[0].setAttribute('id','strela');
    paragrafos[0].appendChild(elementos.i)
    
    
    //Segundo Elemento p(Paragrafo);
    paragrafos[1].textContent=this.tagline;
    
    //Addicionando elementos p(paragrafos) no article#artFilho2;
    for(let n1=0;n1<4;n1++) {
        const p1 = document.createElement('p')
        addElementos2.appendChild(p1);
    }
    
    //Addicionando elemento i dentro do elemento p(paragrafo);
    for(let n1=0;n1<4;n1++){
        const elementosi = document.createElement('i');
        document.querySelectorAll('#artFilho2>p')[n1].appendChild(elementosi);
    }
    
    //Addicionando attributo ID para os primeiros 4 elemetos p(paragrafo) dentro do article#artFilho2;
    document.querySelectorAll('#artFilho2>p')[0].setAttribute('id','p0');
    document.querySelectorAll('#artFilho2>p')[1].setAttribute('id','p1');
    document.querySelectorAll('#artFilho2>p')[2].setAttribute('id','p2');
    document.querySelectorAll('#artFilho2>p')[3].setAttribute('id','p3');
    
    //Addicionando Emoji no elemento article#artFilho2
    document.querySelectorAll('#artFilho2>p>i')[0].setAttribute('class','fa-solid fa-money-bill');
    document.querySelectorAll('#artFilho2>p>i')[1].setAttribute('class','fa-solid fa-chart-line')
    document.querySelectorAll('#artFilho2>p>i')[2].setAttribute('class','fa-solid fa-hourglass-start');
    document.querySelectorAll('#artFilho2>p>i')[3].setAttribute('class','fa-solid fa-audio-description');
    
    //Adicionando mais elementos p(paragrafos);
    for(let n1=1;n1<5;n1++) {
        const paragrafoCriados = document.querySelector('#artFilho2');
        
        const elementoP = document.createElement('p');
        
        paragrafoCriados.insertBefore(elementoP,document.querySelector(`#p${n1}`));
    }
    
    const paragrafoCriados = document.querySelectorAll('#artFilho2>p');
    
    paragrafoCriados[1].textContent=this.budget.toLocaleString('pt-BR',{style:'currency', currency:'BRL'});
    
    paragrafoCriados[3].textContent=this.revenue
    .toLocaleString('pt-BR',{style:'currency', currency:'BRL'});
    
    paragrafoCriados[5].textContent=this.runtime+' minutos'
    
    paragrafoCriados[7].textContent=this.overview
    
}
