"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import fetchPage from "@/utils/fetch-page";
import cleanString from "@/utils/clean-text";
import { RotateCcw } from "lucide-react";
import Timer from "@/components/timer";
export default function Home() {
  const [testText, setTestText] = useState("Placeholder Text");
  const [userText, setUserText] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const correctCharsRef = useRef(correctChars);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [WPM, setWPM] = useState(0.0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Called when Fetch Wikipedia Page button is pressed
   * Calls API to get a Wikipedia page
   * Cleans up raw text
   * Resets game statistics to defaults 
   * Sets time allocation (for now a static 15 seconds)
   */
  const handleReset = async () => {
    const pageText = await fetchPage();
    setTestText(cleanString(pageText));
    setUserText("");
    setCorrectChars(0);
    setIncorrectChars(0);
    setIsRunning(false);
    setTimeLeft(15);
    setIsGameEnded(false);
  };

  /**
   * Tracks typing accuracy by comparing user input with test text.
   * Increments/decrements correct and incorrect character counts as user types or deletes.
   */
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    const newIndex = newText.length - 1;

    if (!isRunning) {
      setIsRunning(true);
    }

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



  const handleTimeChange = useCallback((timeLeft: number) => {
    setTimeLeft(timeLeft);
  }, []);

  // Calculates WPM with formula  -  (chars typed / 5)  * 4 (which is static rn for 15 sec test if the test was lets say 60 sec it would be 1)
  const handleGameEnd = useCallback(() => {
    setWPM((correctCharsRef.current / 5) * 4);
    setIsGameEnded(true);
  }, []);

  // This useEffect is for correct chars as correct chars cannot be passed directly
  // correctChars can only be passed as a reference or the timer 1 sec interval resets every type a correctChar is inputted
  useEffect(() => {
    correctCharsRef.current = correctChars;
  }, [correctChars]);

  // useEffect for triggering autofocus
  // This triggers autofocus on the input box when the text or game ends
  useEffect(() => {
    if (!isGameEnded && inputRef.current){
      inputRef.current.focus();
    }
  }, [isGameEnded, testText])

  // Initialize typing test on component mount 
  useEffect(() => {
    handleReset();
  }, [])

  return (
    <div className="">
      <main className="flex flex-col items-center gap-8">
        {/* Fetch Wikipedia Page */}
        <button
          className="transform bg-slate-800 text-white text-2xl mt-6
          py-3 px-4 mr-4 rounded-lg shadow-md flex justify-center items-center gap-2
          transition hover:shadow-xl hover:bg-emerald-500 hover:scale-105
          w-3/4 lg:w-2/4 font-serif"
          onClick={() => handleReset()}
        >
          Fetch Wikipedia Page <RotateCcw></RotateCcw>
        </button>
  
        {!isGameEnded ? (
          // Main Game Screen
          <section>
            <Timer
              isRunning={isRunning}
              timeLeft={timeLeft}
              onTimeChange={handleTimeChange}
              onGameEnd={handleGameEnd}
            />
  
            <div className="text-3xl container mx-auto relative mt-6">
              <input
                className="absolute w-full h-full opacity-0"
                type="text"
                value={userText}
                onChange={handleUserInput}
                ref={inputRef}
              />
              
              {/* Renders each test character with styles for typing accuracy and cursor position */} 
              {testText.split("").map((letter, index) => {
                let textColorClass = "";
                if (index >= userText.length) {
                  textColorClass = "text-slate-500"; // Untyped character
                } else if (letter === userText[index]) {
                  textColorClass = "text-slate-200"; // Correctly typed character
                } else {
                  textColorClass = "text-rose-300"; // Incorrectly typed character
                }
  
                // Cursor position 
                const isCursorPosition = index === userText.length;
                const cursorClass = isCursorPosition
                  ? "border-l-2 border-white"
                  : "";
  
                return (
                  <span key={index} className={`${textColorClass} ${cursorClass}`}>
                    {letter}
                  </span>
                );
              })}
            </div>
          </section>
        ) : (
          // End Screen
          <section className="bg-slate-800 text-white text-2xl mt-6
          py-3 px-4 mr-4 rounded-lg shadow-md flex justify-center items-center gap-2
          transition hover:shadow-xl flex-col
          w-3/4 lg:w-2/4 font-serif">
            <div className="mt-4 text-blue-400 text-3xl">WPM: {WPM}</div>
            <div className="mt-4 text-blue-400 text-2xl">Accuracy: {Math.round((correctChars)/(correctChars+incorrectChars)*100)}%</div>
            <div className="mt-4 text-emerald-400">
              Correct characters: {correctChars}
            </div>
            <div className="mt-4 text-red-400">
              Incorrect characters: {incorrectChars}
            </div>
            
          </section>
        )}
      </main>
    </div>
  );
}