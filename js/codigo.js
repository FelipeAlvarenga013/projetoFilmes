"use strict";

//Chave da api
const keyApi = 'api_key=fe926addb733eac566b4ba275de51a87';

//Busca pelo ID
const http1 = `https:api.themoviedb.org/3/movie/&append_to_response=videos&language=pt-BR`;

//Buscar pelo Nome do filme
const http2 = `https://api.themoviedb.org/3/search/movie?${keyApi}&language=pt-BR&query=carros 2`;

//Funcão de buscar filmes pelo pesquisar;

if(localStorage.getItem('ch')!=null) {
    document.querySelector('#buscar').value=localStorage.getItem('ch');
    document.querySelector('#buscar').focus();
    document.querySelector('#artFilho1>h1').textContent=localStorage.getItem('ch').toUpperCase()+localStorage.getItem('ch').slice(1)+":";
    console.log(localStorage.getItem('ch'));
    //buscarFilmes.call(sessionStorage.getItem('ch'));
    localStorage.clear();
}

document.querySelector('#buscar').addEventListener('input',function(){
    
    buscarFilmes.apply(this.value);
    
})

//Buscar filmes pela barra de pesquisa;
async function buscarFilmes() {
    
    try{
        
        if(this.length!=0) {
            //Mudar nome da tela principal;
            document.querySelector('#artFilho1>h1').textContent=this[0].toUpperCase()+this.slice(1)+":";
            
            //Apagar elementos existente;
            
            
            const fetch1 = await fetch(`https://api.themoviedb.org/3/search/movie?${keyApi}&language=pt-BR&query= ${this}`);
            const json1 = await fetch1.json();
       
            
            criarElementos.call(json1);
            
        }else {
          
            //Volta com o nome(Melhores Filmes);
            document.querySelector('#artFilho1>h1').textContent='Melhores Filmes:'
            //Apagar elementos existente;
            document.querySelectorAll('section>#secFilho1>article').forEach((vl)=>{
                vl.remove();
            });

            const fetcApi1 = await fetch(`https://api.themoviedb.org/3/movie/popular?${keyApi}&language=pt-BR&page=1`);

            const fetchJson1 = await fetcApi1.json();
            
            
            //Função de criar elementos na pagina html;
            
            
            criarElementos.call(fetchJson1) ;
            
        }
    }catch{

    }
}


//Função para chamar api dos filmes

async function chamarApi() {
    try{
        
        if(document.querySelector('#body').id==='body') {
            const fetcApi1 = await fetch(`https://api.themoviedb.org/3/movie/popular?${keyApi}&language=pt-BR&page=1`);
            const fetchJson1 = await fetcApi1.json();
            
            
            //Função de criar elementos na pagina html;
            criarElementos.call(fetchJson1) ;
            
        }
        
    }catch {
        
    }
    
} 
//Executando função de cima;

//Funcão de criar elementos;

function criarElementos(){
    //function do button de detalhes do filmes;
    document.querySelectorAll('section>#secFilho1>article').forEach((vl,id,arr)=>{
        vl.remove()
        
    });

    for(let n1=0;n1<this.results.length;n1++) {
        
        //Elementos...
        const but1 = document.createElement('button');
        const h2 = document.createElement('h2');
        const p1 = document.createElement('p');
        const img1 = document.createElement('img');
        const article1 = document.createElement('article');
        const i1 = document.createElement('i');
        const a1 = document.createElement('a');
        
        //Setando Nome dentro do buttão;
        a1.textContent='Detalhes';
        
        
        //Setando Nome dentro do Paragrafo;
        p1.textContent=this.results[n1].vote_average.toFixed(1);
        
        //Setando Nome dentro do H2;
        h2.textContent=this.results[n1].title;
        
        //Colocando um title quando passar por cima do elementos Article dos filmes/
        article1.setAttribute('title',this.results[n1].title);
        
        //Colocando Elemento a(Link) dentro do elemento h2;
        
        //Class dos Elementos de cima..;
        but1.setAttribute('class','but1');
        article1.setAttribute('class','article1');
        h2.setAttribute('class','h2Js');
        p1.setAttribute('class','pJs');
        i1.setAttribute('class','fa-solid fa-star');
        a1.setAttribute('class','links');
        
        
        //Setando a API de IMAGENS dentro do elemento IMG ;
        img1.setAttribute('src',`https://image.tmdb.org/t/p/w500/${this.results[n1].poster_path}`);
        
        //Setando Elementos de dentro da pagina HTML Principal;
        document.querySelector('#secFilho1').appendChild(article1);
        document.querySelectorAll('.article1')[n1].appendChild(img1);
        document.querySelectorAll('.article1')[n1].insertBefore(p1,document.querySelectorAll('.but1')[n1]);
        document.querySelectorAll('.article1')[n1].insertBefore(h2,document.querySelectorAll('.pJs')[n1]);
        document.querySelectorAll('.pJs')[n1].appendChild(i1);
        document.querySelectorAll('.article1')[n1].appendChild(but1);
        document.querySelectorAll('.but1')[n1].appendChild(a1);
      
        
    }
    
    document.querySelectorAll('.but1>.links').forEach((vl,id)=>{
        //loop com os elementos button e evento click;
        vl.addEventListener('click',function(){
           
            localStorage.clear('api');
            localStorage.setItem('api',document.querySelectorAll('.but1')[id].parentElement.children[1].textContent);
           
            vl.setAttribute('href','./index2.html');
            
            //fetcApi2(document.querySelectorAll('.but1')[id].parentElement.children[1].textContent);
        })
        
    });
    




    //Buscando ID do filme com o nome do filme;
    /* async function fetcApi2(element1) {
     
        const fetch1 = await fetch(`https://api.themoviedb.org/3/search/movie?${keyApi}&language=pt-BR&query=${element1}`);
        const json1 = await fetch1.json();
       
        
        pegaDetalhe(json1.results[0].id);
    }
    
    
    //Pegando Detalhe do filme com ID;
    async function pegaDetalhe(id) {
        
        
        const fetch1 = await fetch(`https:api.themoviedb.org/3/movie/${id}?${keyApi}&append_to_response=videos&language=pt-BR`);
        const json1 = await fetch1.json();  
    }
     */
    
    
}

chamarApi();
//export default chamarApi();







