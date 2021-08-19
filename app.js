/*
GAME FUNCTION:
- Player must guess a nubmer between a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values

let min = 1, 
    max = 10,
    winningNumber = Math.floor(Math.random()*(max-min+1)+min),
    guessesLeft = 3;


console.log(winningNumber);

// UI elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector('.max-num'),
      guessButton = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again event listent
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
    guessInput.value = '';
  }
});

function verifyGuesses(){
  let guess = guessInput.value;
  guessInput.style.borderColor = 'red';
  let isOk = 1;
  if(guessesLeft != 1){
    if(isNaN(guess) || guess < min || guess > max){
      guessesLeft--;
      setMessage(`Please enter a number between ${min} and ${max}. You have ${guessesLeft} chances left`,'red')
      isOk = 0;
    }else if(guess > winningNumber){
      guessesLeft--;
      setMessage(`Please enter a smaller number. The number is between ${min} and ${max}. You have ${guessesLeft} chances left`,'red');
      isOk = 0;
    }else if(guess < winningNumber){
      guessesLeft--;
      setMessage(`Please enter a bigger number. The number is between ${min} and ${max}. You have ${guessesLeft} chances left`,'red');
      isOk = 0;
    }
  }else{
    setMessage(`You lost, the correct number was ${winningNumber}`,'red');
    guessInput.removeAttribute('placeholder');   
    guessInput.disabled = true;
    guessButton.value = 'Play Again ?';
    guessButton.className = 'play-again';
    isOk = 0;
  }
  guessInput.value = '';
  return isOk;
}

// Listen for guess button
guessButton.addEventListener('click',function(){
  let isOk = verifyGuesses();
  if(isOk === 1){
    guessInput.disabled = true;
    guessInput.style.borderColor = 'green';
    setMessage(`Congrats for picking  ${winningNumber}`,'green');
    guessInput.value = '';
    guessButton.value = 'Play Again ?';
    guessButton.className = 'play-again';
  }
});

function setMessage(msg,color){
  message.textContent = msg;
  message.style.color = color;
}