import React, { Component } from 'react';
import logo from '../img/logo.png';
import bannerLogo from '../img/bannerLogo.png'
import hotPosts from '../img/hot.png';
import newPosts from '../img/new.png';
import topPosts from '../img/top.png';
import risingPosts from '../img/rising.png';

function Logo() {

    return(
        <div>
            <img src={logo} alt='' style={{width:'100px'}}/>
            <img src={bannerLogo} alt='' style={{width:'300px',marginLeft:'4px'}}/><br/>
            <span style={{fontSize:'10px'}}>For people who don't care to be informed</span>
        </div>
    )
}

class SearchForm extends Component {

    changeNews = (event) => {
        this.props.changeUrl(event.target.name);
    }

render() {
    return(
        <div style={{textAlign:'left',width:'100%'}}>
        <form onSubmit={this.props.handleSubmit} style={{float:'left'}}>
        <input style={{height:'30px',fontSize:'24px',width:'500px'}} type="text" name="name" placeholder="Search by keyword, author or tag" value={this.props.query} onChange={this.props.handleChange}/>
        <input className = "submitButton" type="submit" value="Search News" />
        </form>
        <div>
        <img src={hotPosts} name="homeUrl" className="postImg" onClick={this.changeNews} alt='' />
        <img src={topPosts} name= "topUrl" className="postImg" onClick={this.changeNews} alt='' />
        <img src={newPosts} name="newUrl" className="postImg" onClick={this.changeNews} alt='' />
        <img src={risingPosts} name="risingUrl" className="postImg" onClick={this.changeNews} alt='' />
        </div>
        </div>
    )
}
}


class Header extends Component {

render() {

    return(
        <div className="headerDiv">
         <Logo/>    
        <SearchForm handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} changeUrl={this.props.changeUrl}/>
        </div>
)
}
}

  export default Header;