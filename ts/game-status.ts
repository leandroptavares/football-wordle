import { NumberOfAttempts, UserGuess, Status } from "./types.js";

// CORRECT ANSWER:
const CORRECT_ANSWER: string = "MILAN";

// game running? /correct answer?
let isGameRunning: Status = {status: true};
let isTheGuessCorret: Status = {status: false}

// user attempts:
let attemptNumber: NumberOfAttempts = {attempt: 1};

// variable to store the user guess converted to string:
let userGuessAsString: UserGuess = {userGuess: ""};

export { CORRECT_ANSWER, attemptNumber, userGuessAsString, isGameRunning, isTheGuessCorret }
