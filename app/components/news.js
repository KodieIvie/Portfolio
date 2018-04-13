
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(require('../../config/keys').news);

let newsData;

newsapi.v2.topHeadlines({
  country: 'us'
}).then(response => {
  newsData = response;
});

module.exports.newData = newsData;