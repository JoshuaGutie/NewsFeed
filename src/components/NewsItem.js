import React, {Component} from 'react';
// Imported moment to make formatting the article dates easier
import moment from 'moment';
import '../App.css';


// the detail line that goes under the article title
class NewsInfo extends Component {

    render() {
        let baseData=this.props.newsData
        return(
            <div>
                <span style={{fontSize:'10pt'}}>
                    Created: {moment(new Date(baseData.created_at)).format("YYYY-MM-DD hh:mm")}&nbsp;
                    Author: {baseData.author}&nbsp;
                    Comments: {baseData.num_comments ? baseData.num_comments : 0 }&nbsp;
                    Points: {baseData.points}
                    </span>
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
                <a href={baseData.url} target="blank"><h1 className = "articles" style={{marginBottom:'0px'}}>{baseData.title}</h1></a>
                <NewsInfo newsData={this.props.newsData} />
                </div>
                }
            </div>
         
        )
    }
}


export default NewsItem