const game = new Hangman()

// buttons selection
const fruitsBtn = document.getElementById('fruits')
const animalsBtn = document.getElementById('animals')
const countriesBtn = document.getElementById('countries')
const resetBtn = document.getElementById('reset')
const musicBtn = document.getElementById('audio')
const groupBtns = document.querySelector('.buttons')

// whole keyboard selection
const keyboard = document.getElementById('teclado')

// keyboard keys selection
const qKey = document.getElementById('q')
const wKey = document.getElementById('w')
const eKey = document.getElementById('e')
const rKey = document.getElementById('r')
const tKey = document.getElementById('t')
const yKey = document.getElementById('y')
const uKey = document.getElementById('u')
const iKey = document.getElementById('i')
const oKey = document.getElementById('o')
const pKey = document.getElementById('p')
const aKey = document.getElementById('a')
const sKey = document.getElementById('s')
const dKey = document.getElementById('d')
const fKey = document.getElementById('f')
const gKey = document.getElementById('g')
const hKey = document.getElementById('h')
const jKey = document.getElementById('j')
const kKey = document.getElementById('k')
const lKey = document.getElementById('l')
const çKey = document.getElementById('ç')
const zKey = document.getElementById('z')
const xKey = document.getElementById('x')
const cKey = document.getElementById('c')
const vKey = document.getElementById('v')
const bKey = document.getElementById('b')
const nKey = document.getElementById('n')
const mKey = document.getElementById('m')

// images (forcas / win / lose) selection
const bgImage1 = document.getElementById('forca1')
const bgImage2 = document.getElementById('forca2')
const bgImage3 = document.getElementById('forca3')
const bgImage4 = document.getElementById('forca4')
const bgImage5 = document.getElementById('forca5')
const bgImage6 = document.getElementById('forca6')
const bgImage7 = document.getElementById('forca7')
const winImage = document.getElementById('win-image')
const loseImage = document.getElementById('lose-image')
const progress = document.getElementById('progress')

// audios selection
const bgAudio = document.getElementById('bg-music')
const includesLetter = document.getElementById('correct-letter')
const notIncludesLetter = document.getElementById('incorrect-letter')
const almostDying = document.getElementById('bip-audio')
const winnerAudio = document.getElementById('win-audio')
const loserAudio = document.getElementById('lose-audio')
const marreco = document.getElementById('marreco')
const vaiMorrerCoronel = document.getElementById('vaiMorrer-tropa')
let audioActive = true

// chose / hidden word selection
let infoWord = document.getElementById('info-word')
let secretWord = document.getElementById('secret-word')
let remainingTrials = document.getElementById('remaining-trials')

// audios volume
bgAudio.volume = .03
includesLetter.volume = .025
notIncludesLetter.volume = .025
almostDying.volume =  .1
winnerAudio.volume = .1
loserAudio.volume = .1

function disableBtns() {
  fruitsBtn.setAttribute('disabled', true)
  fruitsBtn.style.backgroundColor = '#f3b3a9'
  fruitsBtn.style.color = '#C24733'
  animalsBtn.setAttribute('disabled', true)
  animalsBtn.style.backgroundColor = '#f3b3a9'
  animalsBtn.style.color = '#C24733'
  countriesBtn.setAttribute('disabled', true)
  countriesBtn.style.backgroundColor = '#f3b3a9'
  countriesBtn.style.color = '#C24733'
}

function disabeKeys() {
  event.target.setAttribute('disabled', true)
  event.target.style.backgroundColor = '#f3b3a9'
  event.target.style.color = '#C24733'
}

function disableKeyboard() {
  const allKeys = document.querySelectorAll('.keys')
  for (let disableKeys of allKeys) {
    disableKeys.setAttribute('disabled', true)
    disableKeys.style.backgroundColor = '#EB9689'
    disableKeys.style.color= '#C24733'
  }
}

function enableKeyboard() {
  const allKeys = document.querySelectorAll('.keys')
  for (let enableKeys of allKeys) {
    enableKeys.removeAttribute('disabled')
    enableKeys.style.backgroundColor = '#565656'
    enableKeys.style.color = '#FFFFFF'
  }
}

function muteUnmute() {
  if (audioActive) {
    bgAudio.pause()
    almostDying.pause()
    winnerAudio.pause()
    loserAudio.pause()
    audioActive = false
    musicBtn.innerHTML = 'Music Off'
    musicBtn.style.backgroundColor = '#C24733'
    musicBtn.style.color = '#FFFBFA'
    musicBtn.style.transition = "1s all"
  } else {
    bgAudio.play()
    audioActive = true
    musicBtn.innerHTML = 'Music On'
    musicBtn.style.backgroundColor = '#FFFBFA'
    musicBtn.style.color = '#000000'
  }
}

function restart() {
  window.location.reload()
  game.reset()
}

function changeBackground() {
  if (game.playerChances === 5) {
    bgImage1.style.display = 'none'
    bgImage2.style.display = 'block'
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `You still have ${game.playerChances} chances`
  } else if (game.playerChances === 4) {
    bgImage2.style.display = 'none'
    bgImage3.style.display = 'block'
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `You still have ${game.playerChances} chances`
  } else if (game.playerChances === 3) {
    bgImage3.style.display = 'none'
    bgImage4.style.display = 'block'
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `You have only ${game.playerChances} more chances`
  } else if (game.playerChances === 2) {
    bgImage4.style.display = 'none'
    bgImage5.style.display = 'block'
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `You have only ${game.playerChances} more chances`
  } else if (game.playerChances === 1) {
    bgImage5.style.display = 'none'
    bgImage6.style.display = 'block'
    bgAudio.pause()
    almostDying.currentTime = 0
    almostDying.play()
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `You have only ${game.playerChances} more chance`
  } else if (game.playerChances === 0) {
    remainingTrials.style.display = 'none'
    disableKeyboard()
    setTimeout(() => {
      almostDying.pause()
      bgImage6.style.display = 'none'
    }, 1000)
    setTimeout(() => {
      remainingTrials.style.display = 'block'
      remainingTrials.innerHTML = `YOU LOST! <br>
      The chosen word was ${game.chosenWord.join("")}!`
      loseImage.style.display = 'block'
      loserAudio.currentTime = 0
      loserAudio.play()
    }, 1000)
  } 
}

function renderLetters() {
  secretWord.style.display = 'block'
  secretWord.innerText = game.userAnswer.join("")
}

musicBtn.onclick = muteUnmute
resetBtn.onclick = restart

window.addEventListener('load', () => {
  const choices = document.querySelectorAll('.choice-button')
  disableKeyboard()
  
  for (let btn of choices) {
    btn.addEventListener('click', (event) => {
      let target = event.currentTarget
      let naoEntendi = target.innerText.toLowerCase()
      bgAudio.currentTime = 0
      bgAudio.play()
      audioActive = true
      musicBtn.innerHTML = 'Music On'
      musicBtn.style.backgroundColor = '#FFFBFA'
      musicBtn.style.color = '#000000'
      game.userChoice(naoEntendi)
   
      disableBtns()
      fruitsBtn.style.transition = "1s all"
      animalsBtn.style.transition = "1s all"
      countriesBtn.style.transition = "1s all"
      enableKeyboard()
  })
    btn.addEventListener('click', () => game.userPlay())
    btn.addEventListener('click', () => game.hideWord())
  }
})

window.addEventListener('load', () => {
  const btnChoices = document.querySelectorAll('.keys')
  for (let keys of btnChoices) {
    keys.addEventListener('click', (eventKeys) => {
      let targetKeys = eventKeys.currentTarget
      let naoEntendi2 = targetKeys.value.toUpperCase()
      game.pressedKey(naoEntendi2)
    })
    keys.addEventListener('click', () => {
      game.checkLetter()
      renderLetters()
      game.checkGameOver
      changeBackground()
      game.checkCompletedWord()
      disabeKeys()
    })
  }
})
