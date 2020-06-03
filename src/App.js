import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import NewsItem from './components/NewsItem';

// all the other components are in their own
// files in the components folder

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      pageNumber: 0,
      newsUrl: '//hn.algolia.com/api/v1/search?tags=front_page',
      query: ''
    };

  }

  // this responds when the user clicks the "new", "top" or "rising" buttons on the header
  changeUrl = (event) => {
    let newsUrl='';
    if (event==="homeUrl") newsUrl = '//hn.algolia.com/api/v1/search?tags=front_page';
    if (event==="newUrl") newsUrl = '//hn.algolia.com/api/v1/search_by_date';
    if (event==="risingUrl") newsUrl= '//hn.algolia.com/api/v1/search_by_date?tags=story';
    
    this.setState({
      articles: [],
      pageNumber: 0,
      newsUrl: newsUrl
    })
    this.fetchData(newsUrl,0);
  }

  // this handles the search form submission
  handleSubmit = (event) => {
    const now = new Date()  
    const secondsSinceEpoch = Math.round(now.getTime() / 1000) - 1000000000;
    // special url for search queries
    let newsUrl =`//hn.algolia.com/api/v1/search_by_date?query=${this.state.query}&tags=story&numericFilters=created_at_i>${secondsSinceEpoch}`
    console.log(newsUrl);
    // don't reload the page
    event.preventDefault();

    // clear out existing articles
    this.setState({articles:[],
    newsUrl: newsUrl,
    pageNumber:0
    });
    // load new articles
    this.fetchData(newsUrl, 0);
    this.setState({query: ''});
  }

  // keeps track of what the user's typing in the search box
  handleChange = (event) => {
    this.setState({query: event.target.value});
  }


  infiniteScroll = () => {
    // End of the document reached?
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {

      let newPage = this.state.pageNumber;
      newPage++;
      this.setState({
        pageNumber: newPage
      });
      this.fetchData(this.state.newsUrl, newPage);
    }
  }

  // calls the first set of data
  componentDidMount = () => {
    this.fetchData(this.state.newsUrl, this.state.pageNumber);
    window.addEventListener('scroll', this.infiniteScroll);
  }

  // calls the data
  fetchData = (queryUrl, pageNumber) => {
    // query url is the url for whatever api endpoint we need
    let articles = queryUrl + `&page=${this.state.pageNumber}`;
    // switched to axios to avoid CORS errors
    axios.get(articles)
      .then(data => {
        // check if there's data
        if (data.data.hits) {
        // if there is, add it to the data we already have
        this.setState({
          articles: [...this.state.articles, ...data.data.hits]
        })} else {console.log("no data")}
      })
  }

  render() {
    return (
      <div className="App">
        <Header handleSubmit={this.handleSubmit} query={this.state.query} handleChange={this.handleChange} changeUrl={this.changeUrl} />
        <div>
        {this.state.articles.map((article,idx) => <NewsItem key={idx} newsData={article} />)}
        </div>
      </div>
    );
  }
}

export default App;
