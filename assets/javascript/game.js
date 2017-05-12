var  hang = {
 words: ["austin", "houston", "dallas", "san antonio", "fort worth", "el paso"],
 wrong: [],
 wins: 0, 

 pickWord: function() {
 return [Math.floor(Math.random()*this.words.length)];
 },

 printWrong: function() {
 document.querySelector("#used").innerHTML = this.wrong.toString();
 },

 writeWins: function() {
 var win= "<p>Wins: "+this.wins+"</p>";
 document.querySelector("#wins").innerHTML = win;
 },
};

//resets win counter
var toWin = 0;

//selects random word
var randomIndex = hang.pickWord();
var randomWord = hang.words[randomIndex];

//number of guesses is 3x the lenght of the word
var guesses = randomWord.length*3;

//Displays the amount of guesses left
var guessLeft = "<p>You have "+guesses+" guesses left</p>";
document.querySelector("#guess").innerHTML = guessLeft;

//creates dashes under 
function createSpaces() {
 var spaces = "";
 for (var i=0;i<randomWord.length; i++) {
 spaces += "<p class='spaces'>_</p>";
 document.querySelector("#word").innerHTML = spaces;
 }
}

//makes variable global
document.onkeyup = function(event){
 var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
 console.log(userGuess);
};

//Replaces dashes with properly guessed letters
function updateSpaces() {
 for (var i=0; i<randomWord.length; i++){
 if(userGuess === randomWord[i]) {
 var fill = document.getElementsByClassName('spaces');
 fill[i+1].innerHTML=userGuess;
 toWin++;
 console.log(toWin);
 }
 }
}

//resets game on win or loss
function resetGame() {
 hang.pickWord();
 randomIndex = hang.pickWord();
 randomWord = hang.words[randomIndex];
 toWin= 0;
 hang.wrong = [];
 hang.printWrong();
 guesses = randomWord.length*2;
 guessLeft = "<p>You have "+guesses+" guesses left</p>";
 document.querySelector("#guess").innerHTML = guessLeft;
 createSpaces();
}

//makes the underscores
createSpaces();

//Lets the user know they start with 0 wins
hang.writeWins();

//function to be ran for every user guess
document.onkeyup = function(event) {
 userGuess = String.fromCharCode(event.keyCode).toLowerCase();

 //if the user guess is part of the randomWord
 if(randomWord.indexOf(userGuess) !== -1 && hang.wrong.indexOf(userGuess) ===-1){
  console.log("Letter Contained");
 console.log(toWin);
  updateSpaces();
  }

 //if the user guess isn't part of the word
 else {
  console.log("Letter not Contained");
  guesses--;
 guessLeft = "<p>You have "+guesses+" guesses left</p>";
 document.querySelector("#guess").innerHTML = guessLeft;
  console.log(guesses);
  hang.wrong.push(userGuess);
 console.log(hang.wrong);
 hang.printWrong();
  }

 //loss alert
 if( guesses === 0) {
 alert("You Lost");
 resetGame();
 }

 //win alert
 if( toWin === randomWord.length) {
 hang.wins++;
 hang.writeWins();
 alert("You Win!");
 resetGame();
 }
};
console.log(randomWord);
console.log(guesses);
