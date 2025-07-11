export default function Row({ word, solutionFound, guessed, solution }) {
  const handlePresentMisplacedLetters = (letter, index) => {
    if (!solution.includes(letter)) return false;
    if (solution.includes(letter))
      if (solution.includes(letter) && solution.indexOf(letter) === index)
        return "bg-red-400";
  };

  const handleBgColor = (letter, index) => {
    if (guessed) {
      // Past guesses
      if (
        solution.includes(letter) &&
        solution.indexOf(letter, index - 1) === index
      )
        return "bg-green-500";
      if (solution.includes(letter)) return "bg-yellow-400";
    }
  };
  return (
    <div className="flex gap-5 text-xl flex-row">
      {word.split("").map((letter, index) => {
        return (
          <Letter
            key={index}
            letter={letter}
            index
            bgColor={handleBgColor(letter, index)}
          />
        );
      })}
    </div>
  );
}

const Letter = ({ letter, index, bgColor }) => {
  return (
    <div
      key={index}
      className={`size-10 ${bgColor} border-2 border-solid border-blue-300 rounded-md text-center justify-center align-middle relative transform-3d active:border-blue-200 active:animate-bounce`}
    >
      {letter}
      <div className="absolute z-1 w-full h-full flex justify-center align-middle rotate-x-180 backface-hidden">
        {letter}
      </div>
    </div>
  );
};
