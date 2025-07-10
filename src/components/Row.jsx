export default function Row({ word, solutionFound }) {
  return (
    <div className="flex gap-5 text-xl flex-row">
      {word.split("").map((letter, index) => {
        return (
          <div
            key={index}
            className={`size-10 ${
              solutionFound && letter !== " " ? "bg-green-400" : "bg-blue-900"
            } border-2 border-solid border-blue-300 rounded-md text-center justify-center align-middle relative transform-3d active:border-blue-200 active:animate-bounce`}
          >
            {letter}
            <div className="absolute z-1 w-full h-full flex justify-center align-middle rotate-x-180 backface-hidden">
              {letter}
            </div>
          </div>
        );
      })}
    </div>
  );
}
