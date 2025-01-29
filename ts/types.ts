// custom types:
type MessageBox = "invalid" | "correct" | "lost"

interface NumberOfAttempts {
  attempt: number;
}

interface UserGuess {
  userGuess: string;
}

interface Status {
  status: boolean;
}

export { NumberOfAttempts, UserGuess, Status, MessageBox }
