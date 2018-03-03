



$(document).ready(function(){
//variables for the trivia
var countDown = 30;
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var triviaOver = false;
var notAnswered = 0;

    
    

function setTimer() {
    intervalId = setInterval(countBackwards, 1000);
}

    
//function to set the clock to count backwards, if the time runs out, the game is over 
function countBackwards() {
    countDown --;
    $("#uni").text("TIME LEFT: " + countDown);
    if (countDown <=0) {
        stopCounting();
        triviaOver = true;
//        alert("Game Over!");
//        $("#answers-container").hide();
//        $(".question").hide();
//        $("#button2").hide();
        hideStuff();
    }
}
//when the clock reaches 0 it will stop running    
function stopCounting() {
    clearInterval(intervalId);
}



// this array stores  questions and answers



var quiz = [{
	question: "Who is the current president of the United States?",
    answers: ["Donald Trump", "Bill Clinton", "Barrack Obama", "Hillary Clinton"],
     imgUrl: "assets/images/giphy-trump.gif",
    correctAnswer: "Donald Trump"
}, {
	question: "From 2009 to 2017, who was the first lady of the United States?",
	answers: ["Becky Daniels", "Ivanka Trump", "Michelle Obama", "Hillary Clinton"],
	 imgUrl: "assets/images/giphy-michelle.gif",
	correctAnswer: "Michelle Obama"
}, {
	question: "Who is the first black president of the United States??",
	answers: ["Akon", "Barrack Obama", "Muhamad Ali", "Will Smith"],
	 imgUrl: "assets/images/giphy-obama.gif",
	correctAnswer: "Barrack Obama"
}, {
	question: "Where was facebook founded?",
	answers: ["cambridge, MA", "San Jose, CA", "Mountain View, CA", "Los Angeles, CA"],
	 imgUrl: "assets/images/giphy-facebook.gif",
	correctAnswer: "cambridge, MA"
},

{
	question: "Who founded facebook?",
	answers: ["Becky Daniels", "Bill Gate", "Steve Jobs", "Mark Zuckerberg"],
	 imgUrl: "assets/images/giphy-zurkerberg.gif",
	correctAnswer: "Mark Zuckerberg"
},


{
	question: "What year was facebook founded?",
	answers: ["2oo3", "2009", "2004", "2014"],
	 imgUrl: "assets/images/giphy-2004.gif",
	correctAnswer: "2004"

}];

   
   
	for (var i=0; i<quiz.length; i++) {
		console.log(quiz[i]);  
} 

	//start game    
$("#start-button").click(function() {
    console.log("start the game!"); 
    setTimer();
    countBackwards();  
//display question
    displayQuestion();
//hide start button
	$("#start-button").addClass("hidden");
});
    
//hides the final score
    hideScore();


//  display the next question
    $("#button2").on("click", function () {
      
        if (!triviaOver) {

            value = $("input[type='radio']:checked").val();
            if (value == undefined) {
                notAnswered ++;
				$("#user-stats").text("unanswered: " + notAnswered);
            
            } else {

                if (value == quiz[currentQuestion].correctAnswer) {
                    correctAnswers++;
                    $("#correct-answers").text("Correct AnswerS: " + correctAnswers);
                } else {
					wrongAnswers++;
					 $("#wrong-answers").text("Wrong Answers: " + wrongAnswers);
					 
				} 
                currentQuestion++; 
               
              
                if (currentQuestion < quiz.length)  {
                    displayQuestion();
                } 
                      
                else {
                    alert("game over");
                    displayScore();
                	triviaOver = true; 
                    hideStuff();
                    stopCounting();
                }
            }
        } else { // game not over
            triviaOver = false;
            $("#button2").text("Next Question");
            resetTrivia();
            displayQuestion();
            hideScore();
        }

    });

    

function displayQuestion() {
    
    showGameStats();

    var question = quiz[currentQuestion].question;
    var questionClass = $(".question");
    var choiceList = $(".choice-list");
    var numChoices = quiz[currentQuestion].choices.length;

// Set the questionClass text into the current question, displays current question into the page
    $(questionClass).text(question);
// Remove current <li> elements 
    $(choiceList).find("li").remove();
//inserts answers from array into li elements of the ol
    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = quiz[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynamic-radio-button" />' + choice + '</li>').appendTo(choiceList);
    }  
}
  

//reset the quiz    
function resetTrivia() {
    currentQuestion = 0;
    correctAnswers = 0;
	wrongAnswers = 0;
    hideScore();
   
}
function hideStuff(){
    $("#answers-container, .question, #button2").hide();    
}

function displayScore() {
    $("#result").text("YOU SCORED: " + correctAnswers + " OUT OF " + quiz);
    $("#result").show();   }
    


function hideScore() {
    $("#result").hide();
}


function showGameStats() {
    $("#button2, #user-stats, #correct-answers, #wrong-answers").show();
}
    

   
