import React, { Component } from 'react';
import NavigationButton from './navigationButton';

class NavButtons extends Component {

    render() {
        return (
        <div className='row justify-content-center'>
            <NavigationButton value ='-1' {...this.props} disabled={ this.props.questionIndex===0 } navigate = { this.props.navigate } /> 
            <NavigationButton value = '1' {...this.props} disabled={ this.props.questionIndex+1===this.props.numberOfQuestions } navigate = { this.props.navigate} />
        </div>
        );
    }
}

export default NavButtons;