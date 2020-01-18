import React from 'react';
import './header.css';


class Header extends React.Component {
    render () {
        return (
            <div className="container header-container"> 
                <div className='row justify-content-center'>
                    <div className='logo col-6 col-md-4 col-xl-12 justify-content-center'>
                        <img src="./images/meta4all.png" alt="logo"></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;