class Hangman {
  constructor() {
    this.playerChances = 6
    this.userGroupChoice = ''
    this.keyValue = ''
    this.chosenGroup = ""
    this.chosenWord = []
    this.userAnswer = []
    this.winner = '' // user ou cpu
    this.gameOver = false
  }
  
  userChoice(choice) {
    this.userGroupChoice = choice
    return this.userGroupChoice
  }

  userPlay() {
    if (this.userGroupChoice === 'fruits') {
      this.chosenGroup = ['apple', 'avocado', 'bluebarry', 'banana', 'blackberry', 'cashew', 'coconut', 'cranberry', 'dragonfruit', 'gooseberry', 'watermelon', 'grape', 'jackfruit', 'lemon', 'kiwifruit', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'peach', 'pear', 'pineapple', 'pomegranate', 'strawberry', 'tamarind']
      this.chosenWord = this.chosenGroup[Math.floor(Math.random() * this.chosenGroup.length)]
    } else if (this.userGroupChoice === 'animals') {
      this.chosenGroup = ['donkey', 'giraffe', 'cat', 'horse', 'bull', 'bear', 'rabbit', 'dolphin', 'camel', 'jaguar', 'lizard', 'sheep', 'racoon', 'whale', 'rhinoceros', 'tiger', 'turtle', 'squirrel', 'gorilla', 'deer', 'chameleon', 'kangaroo', 'elk', 'elephant', 'crocodile', 'wolf', 'hippopotamus', 'buffalo']
      this.chosenWord = this.chosenGroup[Math.floor(Math.random() * this.chosenGroup.length)]
    } else if (this.userGroupChoice === 'countries') {
      this.chosenGroup = ['chile', 'canada', 'china', 'italia', 'taiwan', 'kuwait', 'germany', 'argentina', 'kyrgyzstan', 'philippines', 'paraguay', 'ireland', 'pomania', 'qatar', 'switzerland', 'thailand', 'uruguay', 'angola', 'australia', 'belgium', 'cameroon', 'croatia', 'denmark', 'egypt', 'finland', 'france']
      this.chosenWord = this.chosenGroup[Math.floor(Math.random() * this.chosenGroup.length)]
    }
    return this.chosenWord
  }

  hideWord () {
    this.chosenWord = this.chosenWord.toUpperCase().split("")
    infoWord.style.display = 'block'
    infoWord.innerHTML = `You chose the ${this.userGroupChoice} group. <br>
    The chosen word has ${this.chosenWord.length} letters!` 
    return infoWord
  }

  pressedKey(eventKeys) {
    this.keyValue = eventKeys
    return this.keyValue
  }

  checkLetter () {
    for (let i = 0; i < this.chosenWord.length; i++) {
      if (this.chosenWord[i].indexOf(this.keyValue) === 0) {
        includesLetter.play()
        this.userAnswer[i] = this.chosenWord[i]
      } 
      else if (this.userAnswer[i] === undefined) {
        this.userAnswer[i] = "_"
      }
    }
    if (!this.checkGameOver() && !this.chosenWord.includes(this.keyValue)) {
      notIncludesLetter.play()
      this.playerChances -= 1
    }
  }

  checkCompletedWord(){
    if (this.playerChances > 0 && this.chosenWord.toString() === this.userAnswer.toString()) {
      console.log('Checking the word')
      setTimeout(() => {
        bgImage1.style.display = 'none'
        bgImage2.style.display = 'none'
        bgImage3.style.display = 'none'
        bgImage4.style.display = 'none'
        bgImage5.style.display = 'none'
        bgImage6.style.display = 'none'
        bgImage7.style.display = 'none'
        loseImage.style.display = 'none'
        bgAudio.pause()
        almostDying.pause()
        progress.style.display = 'block'
      }, 1000)
      setTimeout(() => {
        progress.style.display = 'none'
        winImage.style.display = 'block'
        remainingTrials.innerHTML = `YOU WIN <br>
        The chosen word is`
        winnerAudio.play()
    }, 3000)
      this.winner = 'player'
      console.log(this.winner)
    }
    return this.winner
  }

  checkGameOver() {
    if (this.playerChances <= 0) {
      this.gameOver = true
      this.winner = 'cpu'
    }
    return this.gameOver
  }

  reset() {
    this.playerChances = 6
    this.userGroupChoice = ''
    this.chosenGroup = []
    this.userAnswer = []
    this.winner = '' 
  }
}