// CORRECT ANSWER:
const randomClubs = ["CEARA", "MILAN", "INTER", "LEEDS", "DERBY", "BAHIA", "BANGU", "OSAKA", "VELEZ", "TIGRE", "CERRO", "WALES", "LAZIO", "DIJON", "MAINZ", "QUEEN", "CLYDE", "MIAMI", "PUMAS", "ELCHE", "AROSA", "GENOA", "BRAGA", "PORTO", "SERPA", "SABAH", "GOMEL", "TREZE", "COLON", "KERRY", "MALMO", "LILLE", "BREST", "BETIS", "LECCE", "UNION", "DHAMK", "LANUS"];
let CORRECT_ANSWER = randomClubs[Math.floor(Math.random() * randomClubs.length)];
function selectNewAnswer() {
    return CORRECT_ANSWER = randomClubs[Math.floor(Math.random() * randomClubs.length)];
}
// game running? /correct answer?
let isGameRunning = { status: true };
let isTheGuessCorret = { status: false };
// user attempts:
let attemptNumber = { attempt: 1 };
// variable to store the user guess converted to string:
let userGuessAsString = { userGuess: "" };
export { CORRECT_ANSWER, attemptNumber, userGuessAsString, isGameRunning, isTheGuessCorret, selectNewAnswer };
