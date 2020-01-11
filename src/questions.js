import React from 'react';
import Axios from 'axios';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './questions.css';
import ShowChart from './chart';

class Questions extends React.Component {
    state = {
        numberOfQuestions: 2,
        randomQuestionList: [],
        displayQuestions: "showItem",
        questionIndex: 0,
        results: null
    }
    async getQuestions () {
        const res = await Axios('http://localhost:3002/questions');
        const questions = res.data;
        const randomQuestionList = [];
        const random = this.randomNumbers(this.state.numberOfQuestions, questions.length);
        for (let num of random) {
            randomQuestionList.push(questions[num])
        }
        for (let question of randomQuestionList) {
            question.score = "";
        }
        this.setState({
            randomQuestionList
        });
    }
    //method for a list of random numbers depending on question list length:
    randomNumbers (howManyNumbers, maxNumber) {
        let numberList = [];
        while (numberList.length < howManyNumbers) {
            let random = Math.floor(Math.random()*maxNumber)
            if (!numberList.includes(random)) {
                numberList.push(random)
            }
        }
        return numberList;
    }

    //sets the index of the question to be displayed
    setIndex = (el) => {
        let questionIndex = this.state.questionIndex + Number(el.target.value);
        this.setState({
            questionIndex
        })
        return;
    }

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
                checked={ this.state.randomQuestionList.question } 
                onChange={ this.handleChange }>
                    { obj.answers[answer] }
                </ToggleButton>);
        }
        return radio;
    }

    // method for answers selection
    handleChange = e => {
        const value = e.target.value;
        const question = e.target.name;
        const randomQuestionList = this.state.randomQuestionList;
        randomQuestionList.map(oldq => {
            if (oldq.question === question) {
                oldq.score = value;
            }
            return oldq;
        })
        this.setState({
            randomQuestionList
        })
    }

    // submit action
    handleClick = () => {
        const finalAnswers = this.state.randomQuestionList;
        if (finalAnswers.find(el => el.score === '')) {
            alert('Please answer all the questions')
            return;
        }
        // create list with all question topics:
        const allTopics = finalAnswers.map(q => q.topic);
        // filter topics and create list with individual topics :
        const topicList = allTopics.reduce((topics, el) => {
            if (!topics.includes(el)) {
                topics.push(el);
            }
            return topics;
        },[]);
        let results = [];
        for (let topic of topicList) {
            results.push({topic,
                          score: 0,
                          numOfQuestions: 0,
                          average: 0
                        })
        }
        for (let result of results) {
            finalAnswers.map(el => {
                if (el.topic === result.topic) {
                    result.numOfQuestions++;
                    result.score += Number(el.score);
                }
                return result; 
            })
        }
        for (let result of results) {
            result.average = result.score/result.numOfQuestions;
        }
        // console.log(document.URL);
        
        const displayQuestions = "hideItem";
        this.setState({
            results,
            displayQuestions
        })  
    }

    // method for navigating questions list
    navigateQuestions = (el) => {
        const questionIndex = Number(el.target.value);
        this.setState({
            questionIndex
        });
    }

    componentDidMount () {
        this.getQuestions();
    }

    render () {
        const showSubmitButton = this.state.randomQuestionList.every(question => question.score !== "")
        return(
            <>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='logo col-6 col-md-4 col-xl-12 justify-content-center'>
                            <img src="./images/meta4all.png" alt="logo"></img>
                        </div>
                    </div>
                </div>
                <div className={ this.state.displayQuestions.concat(' container') }>
                    <div className='questionContainer'>
                    { this.state.randomQuestionList.map((el, index) => (
                        <div className={ index === this.state.questionIndex?"":"hideItem"} key={ el.question.concat(index)}>
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
                    <div className='row justify-content-center'>
                        <button className={ showSubmitButton?'btn btn-success navButton':'hideItem' } onClick={ this.handleClick }>Evaluati</button>
                    </div>
                    <div className='row justify-content-center'>
                        <button 
                        value='-1' 
                        disabled={ this.state.questionIndex===0 }
                        onClick={ this.setIndex } 
                        className='btn btn-primary stepButton navButton'>
                            Inapoi
                        </button>
                        <button 
                        value='1'
                        disabled={ this.state.questionIndex+1===this.state.numberOfQuestions } 
                        onClick={ this.setIndex } 
                        className='btn btn-primary stepButton navButton'>
                            Inainte
                        </button>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='indexButtonsContainer'>
                            { this.state.randomQuestionList.map((el, index) => {
                                const answeredQuestion = this.state.randomQuestionList[index].score ===""?"":" answered"
                                const currentButton = index===this.state.questionIndex?'btn btn-outline-info active':('btn btn-outline-info').concat(answeredQuestion);
                                const button =
                                <button 
                                key={ index } 
                                value={ index } 
                                className={ (currentButton).concat(' indexButton') } 
                                onClick={ this.navigateQuestions }>
                                    { index + 1 }
                                </button>
                                return button;
                            }) }
                        </div>
                    </div>
                </div>
                { this.state.results && <ShowChart data={ [...this.state.results] } /> }       
            </>
        )
    }
};
export default Questions;
