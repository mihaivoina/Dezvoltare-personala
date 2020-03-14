import randomNumbers from '../randomNumbers';
import Axios from 'axios';

const RequestQuestions = async (props) => {
    const tokenArray = document.URL.split("#");
    const token = tokenArray[tokenArray.length - 1];
    const errorLog = [];
    const res = await Axios(`http://localhost:3002/${ token }`).catch((error) => errorLog.push(error));
    if (errorLog.length) {
        return {errorLog};
    }
    const questions = res.data;
    const randomQuestionList = [];
    const random = randomNumbers(props.numberOfQuestions, questions.length);
    for (let num of random) {
        randomQuestionList.push(questions[num])
    }
    for (let question of randomQuestionList) {
        question.score = "";
    }
    return {
        errorLog: null,
        randomQuestionList,
        loadingQuestions: false,
        token
    }
}

export default RequestQuestions;