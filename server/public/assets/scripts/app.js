var inputObject = {};

$(document).ready(function(){
    init();
});

function init() {
    $("#clearButton").hide();

    //The code below prevents form inputs from appearing in the URL
    $("#inputForm").submit(function(event){
        event.preventDefault()
    });

    enable();
}

function enable(){
    $('#submitButton').on('click', obtainInputNumber);
    determineMathOperation();

    $('#clearButton').on('click', clear);
}

//This function takes the numbers input by user and put them in inputObject as separate key:value pairs
function obtainInputNumber(){

    $.each($("#inputForm").serializeArray(), function(i, field){
        inputObject[field.name] = field.value;
    });

    $("#inputForm").find("input[type=text]").val("");

    //append Object information to DOM
    appendInputInfo();

    //POST object to server
    callAjax();
    $("#clearButton").show();
}

//This function adds the selected math operation type to inputObject
function determineMathOperation(){
    $('.math-button').on('click', function(event){
        var mathType = event.target.id;
        inputObject.type = mathType;
    });
}

//This function appends the input numbers on the DOM
function appendInputInfo(){
    $("#displayNumbers").append("<p>First Number: " + inputObject.firstInput + "</p>");
    $("#displayNumbers").append("<p>Second Number: " + inputObject.secondInput + "</p>");
    $("#displayNumbers").append("<p>Mathematical Operation: " + inputObject.type + "</p>");
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
    addMathSymbol(inputObject);
    $("#results").append("<p>" + inputObject.firstInput + " " +
                            inputObject.symbol + " " +
                            inputObject.secondInput +
                            " = " + data.result + "</p>");
}

//This function add math operation symbol according to inputObject.type
function addMathSymbol(object){
    switch(object.type) {
        case "addition":
            object.symbol = "+";
            break;
        case "subtraction":
            object.symbol = "-";
            break;
        case "multiplication":
            object.symbol = "*";
            break;
        case "division":
        default:
            object.symbol = "/";
            break;
    }
}

function clear(){
    $("#displayNumbers").empty();
    $("#results").empty();
    inputObject = {};
    $("#clearButton").hide();
    $(".math-button").removeClass('active');
}