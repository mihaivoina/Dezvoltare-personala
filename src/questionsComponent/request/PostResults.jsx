import Axios from 'axios';

const postResults = async (results, token) => {

    console.log(results);
    
    await Axios.post('http://localhost:3002/12345/1', results[0])
    // .catch((error) => errorLog.push(error));
    // if (errorLog.length) {
    //     return {errorLog};
    // }
    // const questions = res.data;
    // const randomQuestionList = [];
    // const random = randomNumbers(props.numberOfQuestions, questions.length);
    // for (let num of random) {
    //     randomQuestionList.push(questions[num])
    // }
    // for (let question of randomQuestionList) {
    //     question.score = "";
    // }
    // return {
    //     errorLog: null,
    //     randomQuestionList,
    //     loadingQuestions: false
    // }
}

export default postResults;