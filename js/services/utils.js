export const utils = {

    makeId
}


function makeId() {
    var length = getRandomInt(8, 12)
    var word = ''
    while (length) {
        word += String.fromCharCode(getRandomInt(20, 123))
        length--
    }
    return word
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}