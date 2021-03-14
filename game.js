var buttonColors = ["red" , "blue" , "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var flag = false;


$(document).keypress(function (){
	
	if(!flag){
		$("#level-title").text("Level " + level);
		nextSequence();
		flag = true;
	}
});


$(".btn").click(function () {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	animatePress(userChosenColor);

	playSound(userChosenColor);
	//console.log(userClickedPattern);
	checkAns(userClickedPattern.length-1);
});


function nextSequence(){

	userClickedPattern = [];

	level++;
	$("#level-title").text("level " + level);

	var randomNumber = Math.floor(Math.random() * 4);

	var randomChosenColour = buttonColors[randomNumber];
	gamePattern.push(randomChosenColour);

	//animation 
	//animatePress(randomChosenColour);
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
	// return randomNumber;
	//console.log(randomNumber);
}
//nextSequence();

function animatePress(givenColor){
	$("#" + givenColor).addClass("pressed");
	setTimeout(function () {
		$("#"+ givenColor).removeClass("pressed");
	}, 100);
}


function playSound(colorId){
	var audio = new Audio("sounds/" + colorId + ".mp3");
  	audio.play();
}


function checkAns(currLevel){
	if(gamePattern[currLevel] === userClickedPattern[currLevel]){
		//console.log("success");

		if(userClickedPattern.length === gamePattern.length){
			setTimeout(function () {
          		nextSequence();
        	}, 1000);
		}

	}else{
		//console.log("wrong");
		var wrong = "wrong";
		playSound(wrong);
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		},200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver(){
	level = 0;
	gamePattern = [];
	flag = false;
}