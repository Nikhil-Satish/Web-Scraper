const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var url = ''
app.use(cors())
var jsonData = {}

app.post('/',async function (req, res){
  url = req.body.text
  console.log('Got the url: '+url);
  // await putData(url)
  console.log('Before putData');
  await putData(url)
  console.log('After put data');
  console.log(jsonData);
  // res.json('Hi')
    // console.log(jsonData.title);
    res.send(jsonData)
    // res.send(jsonData)
})

async function putData(url){
  await axios(url)
    .then(response =>{
      const html = response.data
      const $ = cheerio.load(html)

      const home = []
      const title = $('.ie-logos',html).find('a').attr('title')

      const date = $('.datefollow .datebox',html).text()

      var contactUrl = 'https://indianexpress.com'+$('#menu-item-6454144').find('a').attr('href')

      var subscribe = $('#menu-item-6454146').find('a').attr('href')

      const socialMediaLinks = []
      $('.g-follow-icon.g-follow li').each(function(){
        const link = $(this).find('a').attr('href')
        socialMediaLinks.push(link)
      })

      const newsGenre = []
      $('h2').each(function(){
        const head = $(this).text()
        newsGenre.push(head)
      })

      // const topNews = []
      // const genreClass = ['.top-news h3 ','#HP_ENTERTAINMENT h4']
      const notUsed = ['#HP_LATEST_VIDEO h4','#HP_VISUAL_STORIES h4','#HP_LATEST_PHOTOS h4','#HP_AUDIO h4',]

      const array = ['.ie-first-story.m-premium','.top-news h3 ','#HP_LATEST_NEWS .top-news h3','#Bangalore .news h4',
      '#HP_ONLY_IN_THE_EXPRESS h4', '#HP_ENTERTAINMENT h4',
      '#HP_LATEST_VIDEO h4','#HP_VISUAL_STORIES h4','#HP_LATEST_PHOTOS h4','#HP_AUDIO h4',
       '#HP_IMAGE_ALREADY_ADDED h4','#HP_TECHNOLOGY h4','#HP_TRENDING h4','#HP_EDUCATION h4',
      '#HP_OPINION h3']

      const newsCollection = []
      array.forEach(element =>{
        const newsTitle = []
        $(element).each(function(){
          const news = $(this).text()
          const link = $(this).find('a').attr('href')
          newsTitle.push({
            news,
            link,
          })
        })
        newsCollection.push(newsTitle)
      })

      const spare = {
        title : title,
        date : date,
        contactUrl : contactUrl,
        subscribe : subscribe,
        socialMediaLinks : socialMediaLinks,
        newsGenre : newsGenre,
        newsCollection : newsCollection
      }

      jsonData = spare

    }).catch(err=>console.log(err))
}



app.listen(3000,function(){
  console.log("Server started on port 3000");
});

// app.get('/', function (req, res) {
//   // res.json(home)
//   // console.log(req);
//   console.log('Data came to get');
//   res.json(spare)
// })
