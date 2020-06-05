import React, { Component } from 'react';
import hotPosts from '../img/hot.png';
import newPosts from '../img/new.png';
import risingPosts from '../img/rising.png';
import info from '../img/info.png';
import Logo from './Logo';



class FilterIcons extends Component {
    changeNews = (event) => {
        let clickedIcon = event.target.id;
        // check to see if they clicked the new div or the words in it
        if (clickedIcon==='newUrl'||clickedIcon==='newPostsCounter') {
            clickedIcon='newUrl';
            this.props.clearNewPostCounter();
        }
        
        this.props.changeUrl(clickedIcon);
    }

    render() {
        return(
        <div>
        <div id="homeUrl" className="postImg" style={{backgroundImage:`url(${hotPosts})`,backgroundSize:'100% 100%',height:'50px',float:'left'}} onClick={this.changeNews} alt='' title='Currently on Front Page'></div>
        <div id="newUrl" className="postImg" style={{backgroundImage:`url(${newPosts})`,backgroundSize:'100% 100%',height:'50px',float:'left'}} onClick={this.changeNews} alt='' title='Recently added' >
        {this.props.newPosts!==0 && <div id="newPostsCounter" style={{border:'1px solid white',borderRadius:'2px',fontSize:'x-small',backgroundColor:'red',color:'white',fontWeight:'bold',float:'right'}}  onClick={this.changeNews}>&nbsp;{this.props.newPosts}&nbsp;</div>}
        </div>
        <div id="risingUrl" className="postImg" style={{backgroundImage:`url(${risingPosts})`,backgroundSize:'100% 100%',height:'50px',float:'left'}} onClick={this.changeNews} alt='' title='Getting a lot of votes' ></div>       
        <div id="info" className="postImg" style={{backgroundImage:`url(${info})`,backgroundSize:'cover', height:'25px',width:'25px',float:'left'}} alt='' title='About PNN' onClick={this.props.showInfo}></div>
        </div>
        )
    }
}

// The search box
class SearchForm extends Component {

render() {
    return(
        <div>
        <form onSubmit={this.props.handleSubmit} style={{float:'left',width:'100%'}}>
        <input style={{height:'30px',fontSize:'24px',minWidth:'100%',maxWwidth:'100%'}} type="text" name="name" placeholder="What's news with you?" value={this.props.query} onChange={this.props.handleChange}/>
        {/* <input className = "submitButton" type="submit" value="Search PNN News" /> */}
        </form>
        </div>
    )
}
}

class Header extends Component {
  
render() {

    return(
        <div className="headerDiv">
        <div style={{width:'30%'}}>
         <Logo/>  </div> 
         <div style={{textAlign:'left',width:'40%'}}>
        <SearchForm handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} query={this.props.query}/>
        </div> 
        <div style={{width:'25%',float:'left'}}>
        {/* these are the pictures the user can click to change the data */}
        <FilterIcons showInfo={this.props.showInfo} changeUrl={this.props.changeUrl} newPosts={this.props.newPosts} clearNewPostCounter={this.props.clearNewPostCounter}/>
        </div>
        </div>
)
}
}

  export default Header;