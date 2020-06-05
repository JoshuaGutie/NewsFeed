import React, {Component, useState} from 'react';
// Imported moment to make formatting the article dates easier
import moment from 'moment';
// use axios to fetch comments
import axios from 'axios';
// comments icon
import commentsIcon from '../img/comments.png';
import opIcon from '../img/op.png';
import loaderIcon from '../img/ajax-loader.gif';

function Comment({ comment,postAuthor }) {

  const [showChildren,setShowChildren] = useState(true);

  // this causes the data to check if there are more "children" comments under
  // the current comment. If there are then is recursively renders more of this
  // same component below the one we originally called and if not renders nothing
    const nestedComments = (comment.children || []).map(comment => {
      return <Comment key={comment.id} postAuthor={postAuthor} comment={comment} type="child" />
    })
   
    return (
      // this margin causes the recursive nested comments to indent so
      // the user can see the thread
      <div style={{"marginLeft": "45px",marginBottom:'10px'}}>
      <div style={{display:'inline',fontWeight:'bold',fontSize:'large'}} onClick={()=> setShowChildren(!showChildren)}>{showChildren ? '-' : '+'}<img src={`https://robohash.org/${comment.author}.png`} style={{width:'30px',marginRight:'4px',verticalAlign:'middle'}} title='' alt=''></img>
      <span style={{fontWeight:'bold'}}>{comment.author}</span> <span style={{fontSize:'10pt'}}>{moment(new Date(comment.created_at)).format("MM-DD-YY hh:mm a")}</span>
      {comment.author===postAuthor && <img src={opIcon} alt='' title='Original Author' style={{width:'16px',marginLeft:'4px'}} />}
      </div>
      {/* this left border is the line that connects the comments on the same level in the thread */}
      {showChildren && 
      <div style={{"marginTop": "2px",borderLeft:'2px solid #cadbce',marginLeft:'4px',position:'relative'}}>
      <div style={{width:'15px',float:'left',position:'absolute',top:'0',bottom:'0'}} onClick={()=>{setShowChildren(!showChildren)}} />
         {/* outputs the comment text in the HTML format in which it was saved. this is the main comment */}
        <div className="commentDiv" dangerouslySetInnerHTML={{ __html: comment.text }} />
        {/* display any nested comments */}
        {nestedComments}
      </div>
      }
      </div>
    )
} 

// the detail line that goes under the article title
class NewsInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          postAuthor: '',
          loadingComments: false,
          comments: [],
          pageNumber: 0,
          showComments: false
        };
    }

    showComments = () => {
      let commentsShowing = this.state.showComments;

        this.setState({
            showComments: !this.state.showComments
        })
        
      if(!commentsShowing) this.fetchComments();
    }

    // calls the data
    fetchComments = () => {
      this.setState({loadingComments:true});
    // query url is the url for whatever api endpoint we need
    let commentsUrl = `//hn.algolia.com/api/v1/items/${this.props.newsData.objectID}`;
    // switched to axios to avoid CORS errors
    axios.get(commentsUrl)
      .then(data => {
        // check if there's data
        if (data.data.children) {
        // if there is, add it to the data we already have
        this.setState({
          loadingComments: false,
          postAuthor: data.data.author,
          comments: [...this.state.comments, ...data.data.children]
        })} else {console.log("no data")}
      })
  }


    render() {
        let baseData=this.props.newsData
        return(
            <div id="commentsDiv" style={{marginLeft:'5px'}}>
                <span style={{fontSize:'10pt'}}>
                    Created: {moment(new Date(baseData.created_at)).format("MM-DD-YY hh:mm a")}&nbsp;
                    Author: {baseData.author}&nbsp;
                    <span onClick={this.showComments}>Comments: {baseData.num_comments ? baseData.num_comments  : 0 } <img src={commentsIcon} alt='' title='show/hide comments' style={{width:'20px'}}/></span>&nbsp;
                    Points: {baseData.points} 
                    {this.state.loadingComments && <img src={loaderIcon} style={{width:'16px',marginLeft:'4px'}} alt='' />}
                </span>
                {this.state.showComments && this.state.comments.length>0 &&
                <div style={{marginTop:'10px',marginLeft:'40px'}}>
                    {this.state.comments.map((comment,idx) => <Comment postAuthor={this.state.postAuthor} key={comment.id} comment={comment} />
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