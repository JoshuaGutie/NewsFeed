import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import NewsItem from './components/NewsItem';

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

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({articles:[]});
    this.fetchData(this.state.query, this.state.pageNumber);
    this.setState({query: ''});
  }

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

  componentDidMount = () => {
    this.fetchData(this.state.query, this.state.pageNumber);
    window.addEventListener('scroll', this.infiniteScroll);
  }

  fetchData = (query, pageNumber) => {
    let articles = this.state.newsUrl;
    axios.get(articles)
      .then(data => {
        if (data.data.hits) {
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
