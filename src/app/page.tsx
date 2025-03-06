"use client";
import { useState } from "react";
import fetchPage from "@/utils/fetch-page";
import cleanString from "@/utils/clean-text";
import { RotateCcw } from "lucide-react";
export default function Home() {
  const [testText, setTestText] = useState("Placeholder Text");
  const [userText, setUserText] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);

  const handelReset = async () => {
    const pageText = await fetchPage();
    setTestText(cleanString(pageText));
    setUserText("");
    setCorrectChars(0);
    setIncorrectChars(0);
  };

  /**
   * Tracks typing accuracy by comparing user input with test text.
   * Increments/decrements correct and incorrect character counts as user types or deletes.
   */
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    const newIndex = newText.length - 1;
    if (newText.length > userText.length) {
      if (newText[newIndex] === testText[newIndex]) {
        setCorrectChars((prev) => prev + 1);
      } else {
        setIncorrectChars((prev) => prev + 1);
      }
    } else {
      if (userText[newIndex + 1] === testText[newIndex + 1]) {
        setCorrectChars((prev) => prev - 1);
      } else {
        setIncorrectChars((prev) => prev - 1);
      }
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

          {/* This code is currently terribly inefficent it has to run O(n) everytime a char is inputted*/}
          {testText.split("").map((letter, index) => {
            let textColorClass = "";
            if (index >= userText.length) {
              textColorClass = "text-slate-500"; // Untyped character
            } else if (letter === userText[index]) {
              textColorClass = "text-slate-200"; // Correctly typed character
            } else {
              textColorClass = "text-rose-300"; // Incorrectly typed character
            }
            
            // Then add cursor styling for the current position
            const isCursorPosition = index === userText.length;
            const cursorClass = isCursorPosition
              ? "border-l-2 border-white"
              : "";

            return (
              <span
                key={index}
                className={`${textColorClass} ${cursorClass}`}
              >
                {letter}
              </span>
            );
          })}
        </div>
        <div className="mt-4 text-emerald-300 ">
          Correct characters: {correctChars}
        </div>
        <div className="mt-4 text-red-400 ">
          Incorrect characters: {incorrectChars}
        </div>
      </main>
    </div>
  );
}
