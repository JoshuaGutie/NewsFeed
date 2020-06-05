import React from 'react';
// our pictures for the header
import logo from '../img/logo.png';
import bob from '../img/bob.png';
import bannerLogo from '../img/bannerLogo.png'

// The PNN Logos and tagline
function Logo() {
    return(
        <div>
            <img src={bob} alt='' style={{float:'left',display:'inline-block',marginRight:'5px'}}/>
            <div style={{display:'flow-root'}}>
            <img src={logo} alt='' style={{width:'100px'}}/><br/>
            <img src={bannerLogo} alt='' style={{width:'300px',maxWidth:'90%'}}/>
            </div>
        </div>
    )
}

export default Logo;