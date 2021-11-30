const feedDisplay = document.querySelector('.feed')
const loadBtn = document.getElementById('#loadBtn')
const searchBtn = document.getElementById('#searchBtn')
const clearSearchBtn = document.getElementById('#clearSearchBtn')
const searchText = document.getElementById('#searchText')
const list = document.querySelector('.list')
const li = document.getElementsByTagName('li');
var newsCollection
var count = 0;
const home = []

// To send the url to backend and receive the json data
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
          const homeDisplay = `<div class=\'head\' ><h3>` + data.title + `</h3><h4>` + data.date + `</h4></div>`
          newsCollection = data.newsCollection
          const headlines = `<div><h6>Headlines :  <a href= \' ` + data.newsCollection[0][0].link + ` \' > ` +data.newsCollection[0][0].news+ `</a> </h6> </div>`
          const genreTitle = '<div><h6>Genre (Click on any genre to expand): </h6></div'
          list.insertAdjacentHTML("beforebegin",genreTitle)
          feedDisplay.insertAdjacentHTML("afterbegin", headlines)
          feedDisplay.insertAdjacentHTML("afterbegin", homeDisplay)

          // Storing the data as html for frontend
          for(var i = 1;i<data.newsCollection.length;i++){
            if(i>=6 && i<=9){
              continue;
            }
            const genre = data.newsGenre[i]
            const str = '\''+genre+'\''
            const ele = data.newsCollection[i]
            var newsItem = ''
            ele.forEach(item =>{
              newsItem += `<p>` + item.news + `: <a href= \' ` + item.link + ` \' > ` +item.link+ `</a></p>`
            })
            const genreItem = '<li class= '+str+'>' +genre+ '<div style=' +'display:none'+ '>'+newsItem+'</div></li>'
            list.insertAdjacentHTML("beforeend", genreItem)
          }

          const afterFeed = `<h6>Contact Us : <a href= \'`
                +data.contactUrl+ `\' > ` +data.contactUrl+ `</a></h6><h6>Subscription
                <a href= \' ` + data.subscribe + ` \' > ` +data.subscribe+ `</a></h6>`

          var mediaLinks = '<h6>Social Media :</h6><ol>'
          data.socialMediaLinks.forEach(media =>{
            mediaLinks += `<li><a href= \' ` + media + ` \' > ` +media+ `</a></li>`
          })
          mediaLinks += '</ol>'
          feedDisplay.insertAdjacentHTML("beforeend", afterFeed)

          feedDisplay.insertAdjacentHTML("beforeend", mediaLinks)


      })
      .catch(err => console.log(err))
}

// To toggle display of details under a particular genre
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

// Load button to load data
loadBtn.addEventListener('click',async function() {
  const url = document.getElementById('#loadText').value
  if(url == ''){
    alert('Please enter a valid url');
    return;
  }

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
      item += '<h6>Search Results</h6>'
      searchList.forEach(element =>{
        item += `<p>` + element.news + `: <a href= \' ` + element.link + ` \' > ` +element.link+ `</a></p>`
      })
      ele.insertAdjacentHTML("beforeend", item)
    }
  }
})

clearSearchBtn.addEventListener('click',function(){
  document.querySelector('.search-result').innerHTML = ''
})
