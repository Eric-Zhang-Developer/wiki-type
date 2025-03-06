"use client";
import { useState } from "react";
import fetchPage from "@/utils/fetch-page";
import cleanString from "@/utils/clean-text";
import { RotateCcw } from "lucide-react";
export default function Home() {
  const [testText, setTestText] = useState("Placeholder Text");
  const [userText, setUserText] = useState("");
  const [correctChars, setCorrectChars] = useState(0);

  const handelReset = async () => {
    const pageText = await fetchPage();
    setTestText(cleanString(pageText));
    setUserText("");
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // To do: Add incorrect check for characters 
    // This will need me to aslo check when removing 
    const newText = event.target.value;
    // User is adding a character 
    if (newText.length > userText.length) {
      const newIndex = newText.length - 1;
      if (newText[newIndex] === testText[newIndex]) {
        setCorrectChars((prev) => prev + 1);
      }
    }
    // other case user removes
    else {
      setCorrectChars((prev) => prev - 1);
    }

    setUserText(newText);
  };

  return (
    <div className="">
      <main className="flex flex-col items-center gap-8">
        <button
          className="transform bg-slate-800 text-white text-2xl mt-6
          py-3 px-4 mr-4 rounded-lg shadow-md flex justify-center items-center gap-2
          transition hover:shadow-xl hover:bg-emerald-500 hover:scale-105
          w-3/4 lg:w-2/4 font-serif"
          onClick={() => handelReset()}
        >
          Fetch Wikipeida Page <RotateCcw></RotateCcw>
        </button>
        <div className="text-3xl container mx-auto relative">
          <input
            className="absolute w-full h-full opacity-0"
            type="text"
            value={userText}
            onChange={handleUserInput}
          />
          {testText.split("").map((letter, index) =>
            index >= userText.length ? (
              <span key={index} className="text-slate-500">
                {letter}
              </span>
            ) : letter === userText[index] ? (
              <span key={index} className="text-slate-200">
                {letter}
              </span>
            ) : (
              <span key={index} className="text-rose-300">
                {letter}
              </span>
            )
          )}
        </div>
        <div className="mt-4 text-emerald-300 ">
          Correct characters: {correctChars}
        </div>
      </main>
    </div>
  );
}
