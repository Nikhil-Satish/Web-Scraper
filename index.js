const feedDisplay = document.querySelector('.feed')
const loadBtn = document.querySelector('.btn');
const searchBtn = document.getElementById('#searchBtn')
const clearSearchBtn = document.getElementById('#clearSearchBtn')
const searchText = document.getElementById('#searchText')
const list = document.querySelector('.list')
const li = document.getElementsByTagName('li');
var newsCollection
var count = 0;
const home = []

function loadScrapper(url){
  count++;
  const data = {text : url}
  const options = {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(data)
  };
  fetch('http://localhost:3000/',options)
  .then(response => response.json())
      .then(data => {
          const homeDisplay = `<div><h2>` + data.title + `</h2><h4>` + data.date + `</h4><h3>Contact Details</h3><a href= \'`
                +data.contactUrl+ `\' > ` +data.contactUrl+ `</a><h3>Subscription link</h3><a href= \' ` + data.subscribe + ` \' > ` +data.subscribe+ `</a>`
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
              newsItem += `<h3>` + item.news + `</h3><a href= \' ` + item.link + ` \' > ` +item.link+ `</a>`
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

function search(word){
  var searchList = []
  word = word.toUpperCase()
  newsCollection.forEach(element =>{
    element.forEach(object =>{
      var title = object.news
      if(title.toUpperCase().search(word)>=0){
        searchList.push(object)
      }
    })
  })
  return searchList;
}

loadBtn.addEventListener('click',async function() {
  const url = document.getElementById('#loadText').value
  if(url == ''){
    alert('Please enter a valid url');
    return;
  }

  if (feedDisplay.style.display === "none") {
    feedDisplay.style.display = "block";
    loadBtn.innerHTML = "Collapse";
  } else {
    feedDisplay.style.display = "none";
    loadBtn.innerHTML = "Expand";
  }
  console.log("URL sent");
  if(count==0){
    loadScrapper(url);
  }
})

searchBtn.addEventListener('click',function(){
  const ele = document.querySelector('.search-result')
  ele.innerHTML = ''
  if(searchText.value!=''){
    const text = searchText.value
    const searchList = search(text)
    if(searchList.length==0){
      window.alert("Sorry! Data not found")
    }
    else{
      var item = ''
      searchList.forEach(element =>{
        item += `<h3>` + element.news + `</h3><a href= \' ` + element.link + ` \' > ` +element.link+ `</a>`
      })
      ele.insertAdjacentHTML("beforeend", item)
    }
  }
})

clearSearchBtn.addEventListener('click',function(){
  document.querySelector('.search-result').innerHTML = ''
})
// function sendUrl(url){
//   const data = {text : url}
//   const options = {
//     method : 'POST',
//     headers : {
//       'Content-Type' : 'application/json'
//     },
//     body : JSON.stringify(data)
//   };
//   fetch('http://localhost:3000/',options)
//   .then(response => response.json())
//   .then(data => {
//     // console.log(data.newsCollection);
//     console.log(data.title);
//   })
// }
