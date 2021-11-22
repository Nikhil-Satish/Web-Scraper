const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const url = 'https://indianexpress.com/'
axios(url)
  .then(response =>{
    const html = response.data
    const $ = cheerio.load(html)
    
    const home = []
    const title = $('.ie-logos',html).find('a').attr('title')
    home.push(title)
    console.log(title);

    const date = $('.datefollow .datebox',html).text()
    home.push(date)
    console.log(date);

    var contactUrl = 'https://indianexpress.com'+$('#menu-item-6454144').find('a').attr('href')
    home.push(contactUrl)
    console.log("Contact details");
    console.log(contactUrl);

    var subscribe = $('#menu-item-6454146').find('a').attr('href')
    home.push(subscribe)
    console.log("Subscription link");
    console.log(subscribe);

    const socialMediaLinks = []
    $('.g-follow-icon.g-follow li').each(function(){
      const link = $(this).find('a').attr('href')
      socialMediaLinks.push(link)
    })
    home.push(socialMediaLinks)
    console.log("Social Media Links");
    console.log(socialMediaLinks);

    app.get('/', function (req, res) {
      res.json(home)
    })

    const topNews = []

    const newsGenre = []
    $('h2').each(function(){
      const head = $(this).text()
      newsGenre.push(head)
    })
    console.log("Topics");
    console.log(newsGenre);

    app.get('/categories', function (req, res) {
        res.json(newsGenre)
    })

    $('.top-news h3 ').each(function(){
      const news = $(this).text()
      const link = $(this).find('a').attr('href')
      topNews.push({
        news,
        link
      })
    })
    console.log("Top News");
    console.log(topNews);
    app.get('/topnews', function (req, res) {
        res.json(news)
    })

    const entertainment = []
    $('#HP_ENTERTAINMENT h4').each(function(){
      const title = $(this).text()
      const url = $(this).find('a').attr('href')
      entertainment.push({
        title,
        url
      })
    })
    app.get('/entertainment', function (req, res) {
        res.json(entertainment)
    })
    console.log("Entertainment news");
    console.log(entertainment);

    const sports = []
    $('#HP_IMAGE_ALREADY_ADDED h4').each(function(){
      const title = $(this).text()
      const url = $(this).find('a').attr('href')
      sports.push({
        title,
        url
      })
    })
    app.get('/sports', function (req, res) {
        res.json(sports)
    })
    console.log("Sports news");
    console.log(sports);

    const tech = []
    $('#HP_TECHNOLOGY h4').each(function(){
      const title = $(this).text()
      const url = $(this).find('a').attr('href')
      tech.push({
        title,
        url
      })
    })
    app.get('/tech', function (req, res) {
        res.json(tech)
    })
    console.log("Technology");
    console.log(tech);

  }).catch(err=>console.log(err))
app.listen(3000,function(){
  console.log("Server started on port 3000");
});
