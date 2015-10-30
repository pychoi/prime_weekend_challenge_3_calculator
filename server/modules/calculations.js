var calculate = function(object){

    var result;
    switch(object.type) {
        case "addition":
            result = Number(object.firstInput) + Number(object.secondInput);
            break;
        case "subtraction":
            result = Number(object.firstInput) - Number(object.secondInput);
            break;
        case "multiplication":
            result = Number(object.firstInput) * Number(object.secondInput);
            break;
        case "division":
        default:
            result = Number(object.firstInput) / Number(object.secondInput);
            break;
    }

    return result;
}

module.exports = calculate;