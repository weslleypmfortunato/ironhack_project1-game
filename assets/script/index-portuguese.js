const game = new Hangman()

// seleciona botões
const fruitsBtn = document.getElementById('frutas')
const animalsBtn = document.getElementById('animais')
const countriesBtn = document.getElementById('paises')
const resetBtn = document.getElementById('reset')
const musicBtn = document.getElementById('audio')
const groupBtns = document.querySelector('.buttons')

// seleciona teclado todo
const keyboard = document.getElementById('teclado')

// seleciona teclas do teclado
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

// seleciona imagens (forcas / win / lose) de feedback
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

// seleciona audios
const bgAudio = document.getElementById('bg-music')
const includesLetter = document.getElementById('correct-letter')
const notIncludesLetter = document.getElementById('incorrect-letter')
const almostDying = document.getElementById('bip-audio')
const winnerAudio = document.getElementById('win-audio')
const loserAudio = document.getElementById('lose-audio')
const marreco = document.getElementById('marreco')
const vaiMorrerCoronel = document.getElementById('vaiMorrer-tropa')
let audioActive = true

// seleciona informações sobre palavra escolhida/secreta
let infoWord = document.getElementById('info-word')
let secretWord = document.getElementById('secret-word')
let remainingTrials = document.getElementById('remaining-trials')

// volume dos audios
bgAudio.volume = .005
includesLetter.volume = .025
notIncludesLetter.volume = .025
almostDying.volume =  .1
winnerAudio.volume = .3
loserAudio.volume = .3
marreco.volume = .1
vaiMorrerCoronel.volume = .1

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
  event.target.style.backgroundColor = '#eb9689'
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
    remainingTrials.innerHTML = `Você tem apenas mais ${game.playerChances} jogadas`
  } else if (game.playerChances === 4) {
    bgImage2.style.display = 'none'
    bgImage3.style.display = 'block'
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `Você tem apenas mais ${game.playerChances} jogadas`
  } else if (game.playerChances === 3) {
    marreco.play()
    bgImage3.style.display = 'none'
    bgImage4.style.display = 'block'
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `Você tem apenas mais ${game.playerChances} jogadas`
  } else if (game.playerChances === 2) {
    vaiMorrerCoronel.play()
    bgImage4.style.display = 'none'
    bgImage5.style.display = 'block'
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `Você tem apenas mais ${game.playerChances} jogadas`
  } else if (game.playerChances === 1) {
    bgImage5.style.display = 'none'
    bgImage6.style.display = 'block'
    bgAudio.pause()
    almostDying.currentTime = 0
    almostDying.play()
    remainingTrials.style.display = 'block'
    remainingTrials.innerHTML = `Você tem apenas mais ${game.playerChances} jogada`
  } else if (game.playerChances === 0) {
    remainingTrials.style.display = 'none'
    disableKeyboard()
    setTimeout(() => {
      almostDying.pause()
      bgImage6.style.display = 'none'
    }, 1000)
    setTimeout(() => {
      remainingTrials.style.display = 'block'
      remainingTrials.innerHTML = `Você perdeu! <br>
      A palavra era ${game.chosenWord.join("")}!`
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
  disableKeyboard() // Added aqui
  
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

