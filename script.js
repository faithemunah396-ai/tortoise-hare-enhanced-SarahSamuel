//render the track

//move tortoise randomly (Math.random())
//move hare randomly




const TRACK_LENGTH = 70 //sometimes constant variables are all caps

const startBtn = document.getElementById("startBtn")
const messageEl = document.getElementById("message")
const trackEl = document.getElementById("track")
const scoreEl = document.getElementById("score")

let tortoisePosition = 1
let harePosition = 1
let raceIntervalId = null
let stepCount = 0
let tortoiseWins = 0
let hareWins = 0

startBtn.addEventListener("click", Startrace)

//start race with button click
//trigger the move every second (setInterval())
function Startrace(){
    messageEl.textContent = "BANG! And they are off!!!"

    startBtn.disabled = true

    //avoid double tracks
    if(raceIntervalId !== null){
        clearInterval(raceIntervalId)
    }
    raceIntervalId = setInterval(raceStep, 1000)
}

function raceStep(){
    stepCount += 1 //or ++

//move tortoise randomly (Math.random())
    moveTortoise()

//move hare randomly
    moveHare()

//fix position if they go beyond the range (0 - 70)
    clampPositions()
//when one of the animals reach 70+, show result message
    if(tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH){
        clearInterval(raceIntervalId)
        raceIntervalId = null
        showResult()
        startBtn.disabled = false
    }
//render the track with the new position
    renderTrack()
}

//move tortoise randomly (Math.random())

function moveTortoise(){
    let roll = Math.floor(Math.random() * 10) + 1

    if(roll >= 1 && roll <=5){
        //1 - 5 fast plod
        tortoisePosition += 4
    }else if(roll >= 6 && roll <= 7){
        //6 - 7 slip
        tortoisePosition -= 5
    }else{
        //8-10 slow plod
        tortoisePosition += 1
    }
}

//move hare randomly
function moveHare(){
    let roll = Math.floor(Math.random() * 10) + 1

    if(roll >= 1 && roll <=3){
        //1-3big hop
        harePosition += 5
    }else if(roll >=4 && roll <= 6){
        //3-6 slip
        harePosition -= 7
    }else{
        tortoisePosition += 8
    }
}

function clampPositions(){
    tortoisePosition = Math.min(TRACK_LENGTH, Math.max(1, tortoisePosition))
    harePosition = Math.min (TRACK_LENGTH, Math.max(1, harePosition))
}

function renderTrack(){
    trackEl.innerHTML = ''

    for  (let i = 1; i <= TRACK_LENGTH; i++){
        let cell = document.createElement('div')
        cell.classList.add("cell")

        let isTortoiseHere = tortoisePosition === i
        let isHarehere = harePosition === i
        
        if(isTortoiseHere && isHarehere){
            cell.classList.add('both')
            cell.textContent = '🔥'
        }else if (isTortoiseHere){
            cell.classList.add("tortoise")
            cell.textContent = "🐢"
        }else if (isHarehere){
            cell.classList.add("hare")
            cell.textContent = "🐇"
        }

        trackEl.appendChild(cell)
    }
}

//add score above tracking
function updateScore(){
    scoreEl.textContent = `Tortoise: ${tortoiseWins} | Hare: ${hareWins}`
}

function showResult(){
    if(tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH){
        messageEl.textContent = 'It is a tie!!'
    }else if( tortoisePosition >= TRACK_LENGTH){
        messageEl.textContent = 'TORTOISE WINS!!! YAYYY'
        tortoiseWins += 1
    }else if(harePosition >= TRACK_LENGTH){
        messageEl.textContent = 'Hare wins. YUCK!'
        hareWins += 1
    }else{
        messageEl.textContent = 'race stopped...'
    }
}

//initial render of the empty track
renderTrack()
updateScore()
