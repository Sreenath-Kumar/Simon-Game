
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var level = 0;

var started = false;

// linsting for starting the game
$(document).keypress(function () {
    if (!started) {
        $('#level-title').text("Level: " + level);
        nextSequence();
        started = true;
    }
})

// action on click
$('.btn').click(function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
})

// check the user input
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over"); 
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// sequence function
function nextSequence() {
    userClickedPattern = [];
    level++;

    $('#level-title').text("Level: " + level);
    var randomNumber = Math.floor((Math.random()) * 4);

    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $('#' + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}
// Restart game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
// playing sound
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// animating elements
function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");

    setTimeout(() => {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}

