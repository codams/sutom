export default function Row({ word }) {
  return (
    <div className="flex gap-5 text-xl flex-row">
      {word.split("").map((letter, index) => {
        console.log(index);
        return (
          <div
            key={index}
            className="size-10 bg-blue-900 border-2 border-solid border-blue-300 rounded-md"
          >
            {letter}
            <div>{letter}</div>
          </div>
        );
      })}
    </div>
  );
}
