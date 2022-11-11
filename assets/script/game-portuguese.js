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
    if (this.userGroupChoice === 'frutas') {
      this.chosenGroup = ['abacate', 'laranja', 'morango', 'banana', 'amora', 'manga', 'abacaxi', 'carambola', 'goiaba', 'jabuticaba', 'melancia', 'pera', 'seriguela', 'tamarindo', 'tangerina', 'carambola', 'cacau', 'damasco', 'figo', 'framboesa', 'graviola', 'jambo', 'kiwi', 'caqui', 'lichia', 'marmelo', 'pistache', 'acerola', 'ameixa', 'caju', 'damasco', 'jaca', 'jambo']
      this.chosenWord = this.chosenGroup[Math.floor(Math.random() * this.chosenGroup.length)]
    } else if (this.userGroupChoice === 'animais') {
      this.chosenGroup = ['baleia', 'girafa', 'gato', 'cavalo', 'vaca', 'lhama', 'bode', 'cabra', 'camelo', 'canguru', 'esquilo', 'gorila', 'lontra', 'mamute', 'rinoceronte', 'abelha', 'andorinha', 'avestruz', 'borboleta', 'burro', 'camundongo', 'capivara', 'carneiro', 'cisne', 'flamingo', 'gaivota', 'golfinho', 'iguana', 'jaguatirica', 'javali', 'lagartixa', 'lambari', 'leopardo', 'lobo', 'marimbondo', 'maritaca', 'morcego']
      this.chosenWord = this.chosenGroup[Math.floor(Math.random() * this.chosenGroup.length)]
    } else if (this.userGroupChoice === 'países') {
      this.chosenGroup = ['chile', 'canada', 'china', 'italia', 'taiwan', 'catar', 'alemanha', 'argentina', 'dinamarca', 'filipinas', 'honduras', 'irlanda', 'jamaica', 'luxemburgo', 'maldivas', 'bahamas', 'barbados', 'brasil', 'camboja', 'cosovo', 'egito', 'espanha', 'guatemala', 'haiti', 'marrocos', 'mianmar', 'montenegro', 'noruega', 'senegal', 'singapura', 'suriname', 'tonga', 'turquia', 'uruguai', 'vaticano']
      this.chosenWord = this.chosenGroup[Math.floor(Math.random() * this.chosenGroup.length)]
    }
    console.log(this.chosenWord)
    return this.chosenWord
  }

  hideWord () {
    this.chosenWord = this.chosenWord.toUpperCase().split("")
    infoWord.style.display = 'block'
    infoWord.innerHTML = `Você escolheu o grupo ${this.userGroupChoice}. <br>
    Sua palavra tem ${this.chosenWord.length} letras!` 
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
      console.log('Verificando a palavra')
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
        remainingTrials.innerHTML = `Você venceu! <br>
        A palavra era`
        winImage.style.display = 'block'
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