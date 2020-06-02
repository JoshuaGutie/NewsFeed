import React, {Component} from 'react';
// Imported moment to make formatting the article dates easier
import moment from 'moment';
// use axios to fetch comments
import axios from 'axios';
// comments icon
import commentsIcon from '../img/comments.png';

function Comment({ comment }) {
    const nestedComments = (comment.children || []).map(comment => {
      return <Comment key={comment.id} comment={comment} type="child" />
    })
   
    return (
      <div style={{"marginLeft": "45px", "marginTop": "10px"}}>
      <span style={{fontWeight:'bold'}}>Author: {comment.author}</span>
        <div className="commentDiv" dangerouslySetInnerHTML={{ __html: comment.text }} />
        {nestedComments}
      </div>
    )
  } 

// the detail line that goes under the article title
class NewsInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comments: [],
          pageNumber: 0,
          showComments: false
        };
    }

    showComments = () => {
        this.setState({
            showComments: !this.state.showComments
        })
        
      this.fetchComments();
    }

    // calls the data
    fetchComments = () => {
    // query url is the url for whatever api endpoint we need
    let commentsUrl = `//hn.algolia.com/api/v1/items/${this.props.newsData.objectID}`;
    // switched to axios to avoid CORS errors
    axios.get(commentsUrl)
      .then(data => {
        // check if there's data
        console.log(data)
        if (data.data.children) {
        // if there is, add it to the data we already have
        this.setState({
          comments: [...this.state.comments, ...data.data.children]
        })} else {console.log("no data")}
      })
  }


    render() {
        let baseData=this.props.newsData
        return(
            <div id="commentsDiv" style={{display:'contents'}}>
                <span style={{fontSize:'10pt'}}>
                    Created: {moment(new Date(baseData.created_at)).format("YYYY-MM-DD hh:mm")}&nbsp;
                    Author: {baseData.author}&nbsp;
                    <span onClick={this.showComments}>Comments: {baseData.num_comments ? baseData.num_comments  : 0 } <img src={commentsIcon} alt='' title='show/hide comments' style={{width:'20px'}}/></span>&nbsp;
                    Points: {baseData.points}
                </span>
                {this.state.showComments && this.state.comments.length>0 &&
                <div style={{marginTop:'10px',marginLeft:'40px'}}>
                    {this.state.comments.map((comment,idx) => <Comment key={comment.id} comment={comment} />
                    )
                    }
                </div>
                }
            </div>
        )
    }
}


// this is each news article
class NewsItem extends Component {

    render() {
        let baseData = this.props.newsData; // just got tired of typing that a lot
        return(
         
            <div style={{marginLeft:'10px'}}>
                {/* I had to check if there was a title, because some of the articles HAVE NO TITLE?!? */}
                {baseData.title && 
                <div>   
                <a style={{textDecoration: 'none'}} href={baseData.url} target="blank"><h1 className="articles" style={{marginBottom:'0px'}}>{baseData.title}</h1></a>
                <NewsInfo newsData={this.props.newsData} />
                </div>
                }
            </div>
         
        )
    }
}


export default NewsItem