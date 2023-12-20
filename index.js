const API_KEY= "3ab6b89df99e47e3b1cfd3ae2434981e"
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    let response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    let data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const template = document.getElementById('template');
    cardContainer.innerHTML="";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = template.content.cloneNode(true);
        fillData(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article){
    const newsImage = cardClone.querySelector('#newsImg');
    const title =cardClone.querySelector('#newsTitle');
    const newsSource = cardClone.querySelector('#newsSource');
    const description =cardClone.querySelector('#description');
    newsImage.src = article.urlToImage;
    title.innerHTML = article.title;
    description.innerHTML= article.description;
    let date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone :'Asia/Jakarta'
    });
    newsSource.innerHTML= `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank')
    })
}
let currSelectList =null;
function listClick(id){
    fetchNews(id);
    const list = document.getElementById(id);
    currSelectList?.classList.remove('active');
    currSelectList = list;
    list.classList.add('active');
}

const inputbtn = document.getElementById('input-button');
const inputText = document.getElementById('input-text');
inputbtn.addEventListener('click',()=>{
        let query = inputText.value;
        if(!query) return;
        fetchNews(query);
        currSelectList?.classList.remove('active');
        currSelectList=null;
});
function reload(){
    window.location.reload();
}
