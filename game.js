var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence() {
    level++;
    $('#level-title').text('Level ' + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$('.btn').click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audi = new Audio('sounds/'+name+'.mp3');
    audi.play();
}

function animatePress(currentColour){
    $('.'+currentColour).addClass('pressed');
    setTimeout(() => {
        $('.'+currentColour).removeClass('pressed');
    }, 100);
}

var started = false;
$(document).keydown(()=>{
    if(!started){
    nextSequence();
    started = true;
    
}
    // console.log('hi')
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('yes')
        if (gamePattern.length === userClickedPattern.length) {
        setTimeout(() => {
            nextSequence()
        }, 1000);
        userClickedPattern = [];
        }
    } else {
        var aud = new Audio('sounds/wrong.mp3');
        aud.play();
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart"');
        startOver()
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
