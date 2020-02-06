import React, { Component } from 'react';

class IndexButtons extends Component {
    
    render() {
        return (
            <div className='row justify-content-center'>
                <div className='indexButtonsContainer'>
                    { this.props.randomQuestionList.map((el, index) => {
                        const answeredQuestion = this.props.randomQuestionList[index].score ===""?"":" answered"
                        const currentButton = index===this.props.questionIndex?'btn btn-outline-info active':('btn btn-outline-info').concat(answeredQuestion);
                        const button =
                        <button 
                        key={ index } 
                        value={ index } 
                        className={ (currentButton).concat(' indexButton') } 
                        onClick={ this.props.navigateQuestions }>
                            { index + 1 }
                        </button>
                        return button;
                    }) }
                </div>
            </div>
        );
    }
}

export default IndexButtons;