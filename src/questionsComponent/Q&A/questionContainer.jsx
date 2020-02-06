import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


class QuestionContainer extends Component {

    //method for creating radio buttons for every question:
    getRadio (obj) {
        const radio = [];
        for (let answer in obj.answers) {
            let inputKey = obj.question.concat(answer);
            radio.push(<ToggleButton
                variant='btn btn-outline-primary answersButton'
                name={ obj.question } 
                id={ obj.answers.answer } 
                value={ answer } 
                key={ inputKey } 
                checked={ this.props.randomQuestionList.question } 
                onChange={ this.props.handleChange }>
                    { obj.answers[answer] }
                </ToggleButton>);
        }
        return radio;
    }

    render() {
        return (
            <div className='questionContainer'>
            { this.props.randomQuestionList.map((el, index) => (
                <div className={ index === this.props.questionIndex?"":"hideItem"} key={ el.question.concat(index)}>
                    <div className='question'>
                        <p>{ el.question }</p>
                    </div>
                    <div className='answers'>
                        <ToggleButtonGroup type='radio' name={ el.question } className='answersButtonsContainer'>
                            { this.getRadio(el) }
                        </ToggleButtonGroup>
                    </div>
                </div>)) }
            </div>
        );
    }
}

export default QuestionContainer;