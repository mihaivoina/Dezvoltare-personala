import React from 'react';

class DisplayButton extends React.Component {

    render(){
        return(
            <div className='row justify-content-center'>
                <button 
                className={ this.props.class } 
                onClick={ () => this.props.evaluate() }>
                    Evaluati
                </button>
            </div>
        )
    }
}

export default DisplayButton;