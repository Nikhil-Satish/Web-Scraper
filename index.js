const feedDisplay = document.querySelector('.feed')
// const topNewsHead = document.querySelector('.top')
// const topNews = document.querySelector('.top-news')
const loadBtn = document.querySelector('.btn');
const list = document.querySelector('.list')
const li = document.getElementsByTagName('li');
var newsCollection
// const searchWord = 'word'
var count = 0;
const home = []

function loadScrapper(){
  count++;
  fetch('http://localhost:3000/')
      .then(response => {return response.json()})
      .then(data => {
          const homeDisplay = `<div><h2>` + data.title + `</h2><h4>` + data.date + `</h4><h3>Contact Details</h3><p>`
                +data.contactUrl+ '</p><h3>Subscription link</h3><p>' +data.subscribe+ '</p></div>'
          feedDisplay.insertAdjacentHTML("afterbegin", homeDisplay)
          newsCollection = data.newsCollection
          for(var i = 0;i<data.newsCollection.length;i++){
            if(i>=6 && i<=9){
              continue;
            }
            const genre = data.newsGenre[i]
            const str = '\''+genre+'\''
            const ele = data.newsCollection[i]
            var newsItem = ''
            ele.forEach(item =>{
              newsItem += `<h3>` + item.news + `</h3><href>` + item.link + `</href>`
            })
            const genreItem = '<li class= '+str+'>' +genre+ '<div style=' +'display:none'+ '>'+newsItem+'</div></li>'
            list.insertAdjacentHTML("beforeend", genreItem)
          }
      })
      .catch(err => console.log(err))
}

document.addEventListener('click',function(e){
    if (e.target && e.target.tagName=="LI" ){
      if(e.target.childNodes[1].attributes[0].value=="display:none"){
        e.target.childNodes[1].attributes[0].value = "display:block"
      }
      else{
        e.target.childNodes[1].attributes[0].value = "display:none"
      }

    }

  })

function search(var word){
  var searchList = []
  newsCollection.forEach(element =>{
    element.forEach(object =>{
      var title = object.news
      if(title.search(word)>=0){
        searchList.push(object)
      }
    })
  })
  return searchList;
}

loadBtn.addEventListener('click', function() {
  // resultContainer.innerHTML = '';
  if (feedDisplay.style.display === "none") {
    feedDisplay.style.display = "block";
    loadBtn.innerHTML = "Collapse";
  } else {
    feedDisplay.style.display = "none";
    loadBtn.innerHTML = "Expand";
  }
  if(count==0){
    loadScrapper();
  }
})
