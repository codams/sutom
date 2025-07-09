import { useState, useRef, useEffect } from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { LETTERS, WORDS } from "../data/lettersAndWords";
const SOLUTION = "canape";

export default function Wordle() {
  const addSpacesToGuess = () => " ".repeat(SOLUTION.length);
  const emptyGuess = addSpacesToGuess();
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
  const wordleRef = useRef();
  console.log("GUESSES", guesses);
  const addLetterInRow = (letter) => {
    guesses.reverse().map((row, indexGuess) => {
      if (row.search(/\s/) !== row.length) {
        if (!row.includes(" ")) return;

        let newGuesses = [...guesses];
        console.log("old", newGuesses);

        newGuesses[indexGuess] = row.replace(" ", letter);
        console.log("newGuesses", newGuesses);
        // console.log("WEIRD", newArray);

        setGuesses(newGuesses);
      }
    });
  };

  const typeLetter = (letter) => {
    console.log("LETTER TYPED " + letter);
    addLetterInRow(letter);
  };
  const hitEnter = () => {
    // TODO handle enter key
  };
  const hitBackSpace = () => {
    // TODO handle backspace key
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
    wordleRef.current.focus();
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
          className={`hidden text-center h-screen-10 text-lg ${notifSuccessColor}`}
        >
          Notification
        </div>
        {guesses.map((guess, index) => {
          return <Row key={index} word={guess} />;
        })}
      </div>
    </div>
  );
}
