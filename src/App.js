import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import NewsItem from './components/NewsItem';
import InfoPanel from './components/InfoPanel';

// all the other components are in their own
// files in the components folder

class App extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let thirtySeconds = Math.round(now.getTime() / 1000)-30000;
    
    this.state = {
      showInfo: false,
      lastNewPostQuery: thirtySeconds,
      newPosts: 0,
      checkingNewPosts: false,
      articles: [],
      pageNumber: 0,
      newsUrl: 'homeUrl',
      query: ''
    };

  }

  // this responds when the user clicks the "new", "top" or "rising" buttons on the header
  changeUrl = (event) => {
    let newsUrl='';
    if (event==="homeUrl") newsUrl = '//hn.algolia.com/api/v1/search?tags=front_page';
    if (event==="newUrl") newsUrl = '//hn.algolia.com/api/v1/search_by_date?tags=story';
    if (event==="risingUrl") newsUrl= '//hn.algolia.com/api/v1/search_by_date?numericFilters=points>=10&tags=story';

    this.setState({
      query: '',
      articles: [],
      pageNumber: 0,
      newsUrl: event
    })
    this.fetchData(newsUrl,0);
  }

  // this handles the search form submission
  handleSubmit = (event) => {
    // don't reload the page
    event.preventDefault();

    // clear out existing articles
    this.setState({articles:[],
    newsUrl: 'queryUrl',
    pageNumber:0
    });
    // load new articles
    this.fetchData('queryUrl', 0);
  }

  // keeps track of what the user's typing in the search box
  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  showInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo
    })
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
    this.checkNewPosts();
    window.addEventListener('scroll', this.infiniteScroll);
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

 
clearNewPostCounter = () => {
const now = new Date()  
const timeInSeconds = Math.round(now.getTime() / 1000);
this.setState({
    lastNewPostQuery: timeInSeconds,
    newPosts: 0
});
document.title= `Pathetic News Network`;
}

checkNewPosts = () => {

this.setState({checkingNewPosts: true});
let newArticles = `//hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${this.state.lastNewPostQuery}`;

// switched to axios to avoid CORS errors
axios.get(newArticles)
  .then(data => {
    // check if there's data
    if (data.data.hits) {
    // if there is, add it to the data we already have
    this.setState({
      checkingNewPosts: false,
      newPosts: data.data.nbHits
    })
    if (data.data.nbHits>0) document.title= `(${data.data.nbHits}) Pathetic News Network`;
    this.intervalID = setTimeout(
      this.checkNewPosts.bind(this),
      30000);
  } else {console.log("no data")}
  })
}


  // calls the data
  fetchData = (queryUrl, pageNumber) => {
    // query url is the url for whatever api endpoint we need
    let articles = queryUrl;
    const now = new Date()  
    const secondsSinceEpoch = Math.round(now.getTime() / 1000) - 1000000000;
    if (articles==="homeUrl") articles = `//hn.algolia.com/api/v1/search?tags=front_page&page=${pageNumber}`;
    if (articles==="newUrl") articles = `//hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`;
    if (articles==="risingUrl") articles= `//hn.algolia.com/api/v1/search_by_date?numericFilters=points>=10&tags=story&page=${pageNumber}`;
    if (articles==="queryUrl") articles = `//hn.algolia.com/api/v1/search_by_date?query=${this.state.query}&tags=story&numericFilters=created_at_i>${secondsSinceEpoch}&page=${pageNumber}`
    
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
        <Header handleSubmit={this.handleSubmit} query={this.state.query} handleChange={this.handleChange} changeUrl={this.changeUrl} clearNewPostCounter={this.clearNewPostCounter} showInfo={this.showInfo} newPosts={this.state.newPosts} />
        <div>
        {this.state.articles.map((article,idx) => <NewsItem key={idx} newsData={article} />)}
        </div>
        {this.state.showInfo && <InfoPanel showInfo={this.showInfo} />}
      </div>
    );
  }
}

export default App;
