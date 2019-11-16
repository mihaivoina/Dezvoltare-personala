import React from 'react';
import Axios from 'axios'

class Questions extends React.Component {
    state = {
        numberOfQuestions: 10,
        topicList: null,
        randomQuestionList: []
    }


    async getQuestions () {
        const res = await Axios('http://localhost:3002/questions');
        // create question list
        const questions = res.data;
         // create list with all question topics:
        const allTopics = questions.map(q => q.topic);
        // filter topics and create list with individual topics :
        const topicList = allTopics.reduce((topics, el) => {
            if (!topics.includes(el)) {
                topics.push(el);
            }
            return topics;
        },[]);
        // create array with 10(can be how many you) random numbers coresponding to the question list:
        // get a list of questions coresponding to the random numbers:
        const randomQuestionList = [];
        const random = this.randomNumbers(this.state.numberOfQuestions, questions.length);
        for (let num of random) {
            randomQuestionList.push(questions[num])
        }

        this.setState({
            topicList,
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
    getRadio (obj) {
        const radio = [];
        for (let answer in obj.answers) {
            let inputKey = obj.question.concat(obj.answers[answer])
            let labelKey = obj.question.concat(answer)
            radio.push(<input type="radio" name={ obj.question } id={ obj.answers.answer } value={ answer } key={ inputKey } />)
            radio.push(<label htmlFor= { obj.answers.answer } key={ labelKey }> { obj.answers[answer] }  </label>)
        }
        return radio;
    }

    handleClick () {

    }

    componentDidMount () {
        this.getQuestions();
    }
    render () {
        return(
            <ul>
                { this.state.randomQuestionList.map(el => (
                    <li key={ el.question }>
                        <p>{ el.message }</p>
                        <p>{ el.question }</p>
                        { this.getRadio(el) }
                    </li>)) }
                <button onClick={ this.handleClick }></button>
            </ul>
        )
    }
};
export default Questions;