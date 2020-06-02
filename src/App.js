import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      pageNumber: 0,
      query: ''
    };

  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
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
      this.fetchData(this.state.query, newPage);
    }
  }

  componentDidMount = () => {
    this.fetchData(this.state.query, this.state.pageNumber);
    window.addEventListener('scroll', this.infiniteScroll);
  }

  fetchData = (query, pageNumber) => {
    let articles = `http://hn.algolia.com/api/v1/search?query=${query}&page=${pageNumber}`;
    fetch(articles)
      .then(res => res.json())
      .then(data => {
        this.setState({
          articles: [...this.state.articles, ...data.hits]
        })
        console.log("data", data)
      })
  }



  render() {
    return (
      <div className="App">

        <form onSubmit={this.handleSubmit}>
          <label>
            Search: 
    <input type="text" name="name" placeholder="Search by term" value={this.state.query} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>

        {this.state.articles.map(article => <h1 style={{ marginBottom: '10px' }} key={article.created_at}> {article.title} </h1>)}

      </div>
    );
  }
}

export default App;
