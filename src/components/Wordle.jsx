import { useState, useRef, useEffect } from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
const SOLUTION = "canape";

export default function Wordle() {
  const [guesses, setGuesses] = useState([
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
  ]);
  const [notifSuccessColor, setNotifSuccessColor] = useState("text-white");
  const wordleRef = useRef();
  const handleKeyDown = () => {};
  useEffect(() => {
    wordleRef.current.focus();
  }, []);

  return (
    <div className="m-0 p-0 bg-blue-950 flex justify-center uppercase text-gray-50 h-screen">
      <div
        className=" flex flex-col gap-5 align-middle"
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
