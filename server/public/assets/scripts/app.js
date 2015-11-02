var inputObject = {};
var tempNumber = "";

$(document).ready(function(){
    init();
});

function init() {

    createNumberButtons();
    enable();
}

function createNumberButtons(){
    for (var i = 7; i < 10; i++){
        $("#numberButtons").append("<div id='" + i + "' class='btn btn-default col-xs-4 num-button'>" + i + "</div>");
    }
    for (var i = 4; i < 7; i++){
        $("#numberButtons").append("<div id='" + i + "' class='btn btn-default col-xs-4 num-button'>" + i + "</div>");
    }
    for (var i = 1; i < 4; i++){
        $("#numberButtons").append("<div id='" + i + "' class='btn btn-default col-xs-4 num-button'>" + i + "</div>");
    }
    $("#numberButtons").append("<div id='" + 0 + "' class='btn btn-default col-xs-4 num-button'>" + 0 + "</div>");
    $("#numberButtons").append("<div id='.' class='btn btn-default col-xs-4 num-button'>.</div>");
    $("#numberButtons").append("<div id='equalButton' class='btn btn-success col-xs-4'>=</div>");
}

function enable() {
    clickNumberButton();
    determineMathOperation();
    $('#equalButton').on('click', calculate);
    $('#clearButton').on('click', clear);
}

function clickNumberButton(){
    $('.num-button').on('click', function(event){
        var number = "";
        number = event.target.id;
        tempNumber += number;
        $("#calculatorDisplay").empty().text(tempNumber);
        inputObject.secondInput = tempNumber;
    });
}

//This function adds the selected math operation type to inputObject
function determineMathOperation(){
    $('.math-button').on('click', function(event){
        var mathType = event.target.id;
        inputObject.type = mathType;

        //store first number to inputObject
        inputObject.firstInput = tempNumber;
        tempNumber = "";
    });
}

//This function calls Ajax to perform calculation
function calculate(){
    //POST object to server
    callAjax();
}

//This function post inputObject to server
function callAjax(){
    $.ajax({
        type: "POST",
        url: "/data",
        data: inputObject,
        success: function(data){
            displayResult(data);
        }
    });
}

//This function displays result of the calculation
function displayResult(data){
    $("#calculatorDisplay").empty().text(data.result);
    tempNumber = data.result;
}

//This function resets the calculator
function clear(){
    inputObject = {};
    tempNumber = "";
    $("#calculatorDisplay").empty().text("0");
}