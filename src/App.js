import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      pageNumber: 0
    };

  }


  infiniteScroll = () => {
    // End of the document reached?
    if (window.innerHeight + document.documentElement.scrollTop
    === document.documentElement.offsetHeight){
     
       let newPage = this.state.page;
       newPage++;
        this.setState({
             page: newPage
        });
       this.fetchData(newPage);
       }
    }

  componentDidMount = () => {
    this.fetchData(this.state.pageNumber);
    window.addEventListener('scroll', this.infiniteScroll);
    }

  fetchData = (pageNum) => {
    let articles = 'http://hn.algolia.com/api/v1/search?query='+pageNum;
    fetch(articles)
       .then(res=>res.json())
       .then(data => {
          this.setState({
              articles: [...this.state.articles,...data.hits]
          })
          console.log("data", data)
       })
      }

       

  render(){
  return (
    <div className="App">
      {this.state.articles.map(article => <div style = {{marginBottom: '200px'}} key = {article.created_at}> {article.title} </div>)}

    </div>
  );
}
}

export default App;
