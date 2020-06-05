import React from 'react';
import Logo from './Logo';
import closeButton from '../img/redX.png';
import laura from '../img/laura.jpg';
import josh from '../img/josh.jpg';
import crashdaddy from '../img/crashdaddy.png';
import hn from '../img/hacker-news-logo-png-15.png';

function HN() {
    return (
        <div style={{textAlign:'center',paddingTop:'45px',fontWeight:'bold',verticalAlign:'middle'}}>
            Data provided by Hacker News API:
            <a href="https://hn.algolia.com/api" target="blank"><img src={hn} alt='' style={{marginLeft:'5px',height:'50px',border:'1px solid black',verticalAlign:'middle'}} title="Hacker News API"/></a>
        </div>
    )
}

function Card({person}) {

    return(
        <div className="infoCard">
            <a href={person.link} target="blank" style={{color:'black',textDecoration:'none'}}>
            <img src={person.img} alt='' className="imgPic" />
            <div style={{fontSize:'large',fontWeight:'bold'}}>{person.name}</div>
            <div style={{fontSize:'small'}} >{person.contribution}</div>
            </a>
        </div>
    )
}

function InfoPanel({showInfo}) {

    return(
        <div className="windowPane" style={{padding:'0px',paddingBottom:'20px'}}>
        <div className="infoHeader"><Logo/><div id="closeButton" style={{position: 'absolute',top:'5px',right:'5px'}}>
                <img src={closeButton} alt="" style={{width:'30px'}} onClick={showInfo} />
                </div>
        </div>
        <div className="contributors" >
           <Card person={{img:`${josh}`,name: 'JoshuaGutie',contribution:'Framework,CSS,Animation',link:'https://github.com/joshuagutie'}} />
           <Card person={{img:`${laura}`,name: 'Laavang',contribution:'CSS,Header,Search',link:'https://github.com/laavang'}} />
           <Card person={{img:`${crashdaddy}`,name:'Crashdaddy',contribution:'API, State',link:'https://github.com/crashdaddy'}} />
           
        </div> 
        <HN/>
        </div>
    )
}

export default InfoPanel;