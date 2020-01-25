import React from 'react';

class NavigationButton extends React.Component {

    render(){
        return(
            <button 
            value={ this.props.value } 
            disabled={ this.props.disabled }
            onClick={ (el) => this.props.navigate(el) } 
            className='btn btn-primary stepButton navButton'>
                { this.props.value === '-1' ? 'Inapoi':'Inainte'}
            </button>
        )
    }
}

export default NavigationButton;