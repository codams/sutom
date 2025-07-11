import { useState, useRef, useEffect } from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { LETTERS, WORDS } from "../data/lettersAndWords";
const SOLUTION = "canape";

export default function Wordle() {
  // We can display misplaced and not used letters
  const addSpacesToGuess = () => " ".repeat(SOLUTION.length);
  const emptyGuess = addSpacesToGuess();
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const incrementLetterIndex = () => {
    if (currentLetterIndex < SOLUTION.length - 1)
      setCurrentLetterIndex(currentLetterIndex + 1);
  };
  const [guesses, setGuesses] = useState([
    emptyGuess,
    emptyGuess,
    emptyGuess,
    emptyGuess,
    emptyGuess,
    emptyGuess,
  ]);
  const [solutionFound, setSolutionFound] = useState(false);
  const [notifSuccessColor, setNotifSuccessColor] = useState("text-white");
  const [notification, setNotification] = useState("");
  const wordleRef = useRef(null);

  const addLetterInRow = (letter) => {
    let currentRow = guesses[currentGuessIndex];
    if (currentRow.search(/\s/) !== currentRow.length) {
      if (!currentRow.includes(" ")) {
        return;
      }

      let newGuesses = [...guesses];

      newGuesses[currentGuessIndex] = currentRow.replaceAt(
        currentLetterIndex,
        letter
      );
      incrementLetterIndex();
      setGuesses(newGuesses);
    }
  };

  const typeLetter = (letter) => {
    addLetterInRow(letter);
  };
  const hitEnter = () => {
    // TODO handle enter key
    let currentRow = guesses[currentGuessIndex];
    if (
      currentRow.search(/\s/) !== currentRow.length &&
      currentRow.search(/\s/) !== -1
    ) {
      // We still have blank space
      setNotification("Le mot n'est pas complet");
      setNotifSuccessColor("text-red-500");
      return;
    }
    if (currentRow.search(/\s/) === -1) {
      if (currentRow === SOLUTION) {
        setSolutionFound(true);
      }
    }
    setCurrentGuessIndex(currentGuessIndex + 1);
    setCurrentLetterIndex(0);
  };
  const hitBackSpace = () => {
    // TODO handle backspace key
    let currentRow = guesses[currentGuessIndex];
    let newGuesses = [...guesses];
    newGuesses[currentGuessIndex] = currentRow.replaceAt(
      currentLetterIndex,
      " "
    );
    setGuesses(newGuesses);
    if (currentLetterIndex > 0) setCurrentLetterIndex(currentLetterIndex - 1);
  };
  const handleKeyDown = (e) => {
    if (solutionFound) return;
    if (LETTERS.includes(e.key)) {
      typeLetter(e.key);
    } else if (e.key === "Enter") {
      hitEnter();
    } else if (e.key === "Backspace") {
      hitBackSpace();
    }
  };
  useEffect(() => {
    setTimeout(() => {
      wordleRef.current?.blur();
      wordleRef.current?.focus();
    }, 100);
  }, []);

  return (
    <div className="m-0 p-0 bg-blue-950 flex justify-center uppercase text-gray-50 h-screen">
      <div
        className=" flex flex-col gap-5 align-middle focus-visible:outline-none"
        ref={wordleRef}
        tabIndex={0}
        onBlur={(e) => e.target.focus()}
        onKeyDown={handleKeyDown}
      >
        <h1 className="text-3xl text-center">Sutom</h1>
        <div
          className={`${
            notification ? "visible" : "hidden"
          } text-center h-screen-10 text-lg ${notifSuccessColor}`}
        >
          {notification}
        </div>
        {guesses.map((guess, index) => {
          return (
            <Row
              guessed={currentGuessIndex > index}
              key={index}
              word={guess}
              solution={SOLUTION}
              solutionFound={solutionFound}
            />
          );
        })}
      </div>
    </div>
  );
}
