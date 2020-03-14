import React from 'react';
import './questions.css';
import {ShowChart, DisplayButton, RequestError, LoadingDisplay, QuestionContainer, IndexButtons, NavButtons, evaluateQuestions, postResults} from './index';
import RequestQuestions from './request/RequestQuestions';

class Questions extends React.PureComponent {
    state = {
        numberOfQuestions: 2,
        randomQuestionList: [],
        displayQuestions: "showItem",
        questionIndex: 0,
        results: null,
        token: null,
        loadingQuestions: true,
        errorLog: null,
        URL: document.URL,
        showSubmitButton: false
    }

    getToken () {
        RequestQuestions(this.state).then((response) => {
            this.setState({...response});
        }).catch(() => {
            this.setState({
                errorLog: 'Faild to make request'
            })
        })
    }

    //sets the index of the question to be displayed
    setIndex = (el) => {
        let questionIndex = this.state.questionIndex + Number(el.target.value);
        this.setState({
            questionIndex
        })
        return;
    }

    // method for answers selection
    recordAnswer = e => {
        const value = e.target.value;
        const question = e.target.name;
        const randomQuestionList = this.state.randomQuestionList;
        randomQuestionList.map(oldq => {
            if (oldq.question === question) {
                oldq.score = value;
            }
            return oldq;
        })
        this.allQuetionsAnswered();
        this.setState({
            randomQuestionList
        })
    }

    evaluateAnswers = () => {
        const evaluate = evaluateQuestions(this.state)
        this.setState({...evaluate});
        postResults(this.state.randomQuestionList, this.state.token);
        // console.log('obiect final', this.state.token);
        
    }

    allQuetionsAnswered = () => {
        const showSubmitButton = this.state.randomQuestionList.every(question => question.score !== "");
        this.setState({
            showSubmitButton
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
        this.getToken();
    }

    render () {
        window.onhashchange = () => { 
            this.getToken();
       }
        
        if (this.state.errorLog) {
            return (
                <>
                    <RequestError error={ this.state.errorLog} />
                </>
            );
        }
        return(
            <>
                { this.state.loadingQuestions ? <LoadingDisplay /> : (
                <div className={ this.state.displayQuestions.concat(' container') }>
                    <QuestionContainer {...this.state} handleChange = {this.recordAnswer} />
                    <DisplayButton class = { this.state.showSubmitButton?'btn btn-success navButton':'hideItem' } evaluate = { this.evaluateAnswers } />
                    <NavButtons {...this.state} navigate={this.setIndex}/>
                    <IndexButtons {...this.state} navigateQuestions={this.navigateQuestions}/>
                </div>) }
                { this.state.results && <ShowChart data={ [...this.state.results] } /> }     
            </>
        )
    }
};
export default Questions;
