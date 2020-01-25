function randomNumbers (howManyNumbers, maxNumber) {
    let numberList = [];
    while (numberList.length < howManyNumbers) {
        let random = Math.floor(Math.random()*maxNumber)
        if (!numberList.includes(random)) {
            numberList.push(random)
        }
    }
    return numberList;
}

export default randomNumbers;