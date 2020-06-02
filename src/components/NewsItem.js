import React, {Component} from 'react';
// Imported moment to make formatting the article dates easier
import moment from 'moment';
// use axios to fetch comments
import axios from 'axios';
// comments icon
import commentsIcon from '../img/comments.png';

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
    let commentsUrl = `//hn.algolia.com/api/v1/search?tags=comment,story_${this.props.newsData.objectID}&page=${this.state.pageNumber}&hitsPerPage=250`;
    // switched to axios to avoid CORS errors
    axios.get(commentsUrl)
      .then(data => {
        // check if there's data
        if (data.data.hits) {
        // if there is, add it to the data we already have
        this.setState({
          comments: [...this.state.comments, ...data.data.hits]
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
                <div style={{marginTop:'10px'}}>
                    {this.state.comments.map((comment,idx) => <div key={"comment"+idx} style={{display:'inline-block',width:'100%'}}><div style={{width:'80%',float:'right',marginBottom:'14px',padding:'10px',border:'1px solid black'}} dangerouslySetInnerHTML={{ __html: comment.comment_text }} />
                    <div style={{width:'18%',textAlign:'right',marginBottom:'10px',fontWeight:'bold',marginRight:'10px'}}>
                    Author: {comment.author}
                    </div>
                    </div>
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