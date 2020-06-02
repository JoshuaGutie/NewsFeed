import React, {Component} from 'react';
import moment from 'moment';

class NewsInfo extends Component {

    render() {
        let baseData=this.props.newsData
        return(
            <div>
                <span style={{fontSize:'10pt'}}>
                    Created: {moment(new Date(baseData.created_at)).format("YYYY-MM-DD hh:mm")}
                    Author: {baseData.author}
                    Comments: {baseData.num_comments ? baseData.num_comments : 0 }
                    Points: {baseData.points}
                    </span>
            </div>
        )
    }
}

class NewsItem extends Component {

    render() {
        let baseData = this.props.newsData; // just got tired of typing that a lot
        return(
         
            <div style={{marginLeft:'10px'}}>
                {baseData.title && 
                <div>   
                <a href={baseData.url} target="blank"><h1 style={{marginBottom:'0px'}}>{baseData.title}</h1></a>
                <NewsInfo newsData={this.props.newsData} />
                
                </div>
                }
            </div>
         
        )
    }
}


export default NewsItem