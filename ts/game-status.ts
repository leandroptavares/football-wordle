import { NumberOfAttempts, UserGuess, Status } from "./types.js";

// CORRECT ANSWER:
const randomClubs: string[] = ["MILAN", "INTER", "LEEDS", "DERBY", "BAHIA", "BANGU", "OSAKA", "VELEZ", "TIGRE", "CERRO", "WALES", "LAZIO", "DIJON", "MAINZ", "QUEEN", "CLYDE", "MIAMI", "PUMAS", "ELCHE", "AROSA", "GENOA", "BRAGA", "PORTO", "SERPA", "SABAH", "GOMEL", "TREZE", "COLON", "KERRY", "MALMO"]

let CORRECT_ANSWER: string = randomClubs[Math.floor(Math.random() * randomClubs.length)];

function selectNewAnswer(): string {
  return CORRECT_ANSWER = randomClubs[Math.floor(Math.random() * randomClubs.length)];
}


// game running? /correct answer?
let isGameRunning: Status = {status: true};
let isTheGuessCorret: Status = {status: false}

// user attempts:
let attemptNumber: NumberOfAttempts = {attempt: 1};

// variable to store the user guess converted to string:
let userGuessAsString: UserGuess = {userGuess: ""};

export { CORRECT_ANSWER, attemptNumber, userGuessAsString, isGameRunning, isTheGuessCorret, selectNewAnswer }
