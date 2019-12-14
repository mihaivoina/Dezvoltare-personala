import React from 'react';
import Axios from 'axios';
import { ToggleButtonGroup, ToggleButton, Carousel } from 'react-bootstrap';
import './questions.css';
import ShowChart from './chart';

class Questions extends React.Component {
    state = {
        numberOfQuestions: 3,
        // topicList: null,
        randomQuestionList: [],
        displayQuestions: "showItem",
        results: null
    }


    async getQuestions () {
        const res = await Axios('http://localhost:3002/questions');
        const questions = res.data;
        //  // create list with all question topics:
        // const allTopics = questions.map(q => q.topic);
        // // filter topics and create list with individual topics :
        // const topicList = allTopics.reduce((topics, el) => {
        //     if (!topics.includes(el)) {
        //         topics.push(el);
        //     }
        //     return topics;
        // },[]);
        // create array with 10(can be how many you) random numbers coresponding to the question list:
        // get a list of questions coresponding to the random numbers:
        const randomQuestionList = [];
        const random = this.randomNumbers(this.state.numberOfQuestions, questions.length);
        for (let num of random) {
            randomQuestionList.push(questions[num])
        }
        for (let question of randomQuestionList) {
            question.score = "";
        }

        this.setState({
            // topicList,
            randomQuestionList
        });
    }

    //method for a list of random numbers depending on question list length:
    randomNumbers (howManyNumbers, maxNumber) {
        let numberList = [];
        while (numberList.length < howManyNumbers) {
            let random = Math.floor(Math.random()*(maxNumber-1))
            if (!numberList.includes(random)) {
                numberList.push(random)
            }
        }
        return numberList;
    }

    //method for creating radio buttons for every question:

    // getRadio (obj) {
    //     const radio = [];
    //     for (let answer in obj.answers) {
    //         let inputKey = obj.question.concat(answer)
    //         let labelKey = answer.concat(obj.question)
    //         radio.push(<input 
    //             type="radio" 
    //             name={ obj.question } 
    //             id={ obj.answers.answer } 
    //             value={ answer } 
    //             key={ inputKey } 
    //             checked={ this.state.randomQuestionList.question } 
    //             onChange={ this.handleChange }/>)
    //         radio.push(<label htmlFor= { obj.answers.answer } key={ labelKey }> { obj.answers[answer] }  </label>)
    //     }
    //     return radio;
    // }

    getRadio (obj) {
        const radio = [];
        for (let answer in obj.answers) {
            let inputKey = obj.question.concat(answer);
            radio.push(<ToggleButton
                variant='primary'
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

    handleClick = () => {
        const finalAnswers = this.state.randomQuestionList;
        if (finalAnswers.find(el => el.score === '')) {
            alert('Please answer all the questions')
            return;
        }
        // const topicList = this.state.topicList;
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
        const displayQuestions = "hideItem";
        this.setState({
            results,
            displayQuestions
        })
        // console.log(results);
        
    }

    componentDidMount () {
        this.getQuestions();
    }

    render () {
        return(
            <>
                <div className={ this.state.displayQuestions }>
                    <Carousel interval={ null } wrap={ false }>
                        { this.state.randomQuestionList.map(el => (
                            <Carousel.Item key={ el.question }>
                                <img className="d-block w-100" src='Black.png' alt='Background' />
                                <Carousel.Caption key={ el.question }>
                                    {/* <p>{ el.message }</p> */}
                                    <p>{ el.question }</p>
                                    <ToggleButtonGroup type='radio' name={ el.question }>
                                    { this.getRadio(el) }
                                    </ToggleButtonGroup>
                                </Carousel.Caption>
                            </Carousel.Item>)) }
                    </Carousel>
                </div>
                <button onClick={ this.handleClick }>Submit</button>
                {/* { this.state.results?<ShowChart data={ [...this.state.results] } />:"" } */}
                { this.state.results && <ShowChart data={ [...this.state.results] } /> }
            </>
        )
    }
};
export default Questions;
