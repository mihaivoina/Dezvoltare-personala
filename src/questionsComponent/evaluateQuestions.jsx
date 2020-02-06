function evaluateQuestions(props) {
    const finalAnswers = props.randomQuestionList;
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
    return {results, displayQuestions}
}

export default evaluateQuestions;