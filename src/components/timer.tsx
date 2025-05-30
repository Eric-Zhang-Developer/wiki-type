import { TimerProps } from "@/types/components";
import { useRef, useEffect } from "react";

export default function Timer({
  timeLeft,
  isRunning,
  onTimeChange,
  onGameEnd,
}: TimerProps) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Timer
  useEffect(() => {
    // only run if timer is valid and test is running
    if (timeLeft > 0 && isRunning) {
      timerRef.current = setInterval(() => {
        onTimeChange(timeLeft - 1);
      }, 1000);
    } else if (timeLeft <= 0 && isRunning) {
      onGameEnd();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft, onTimeChange, onGameEnd]);

  return (
    <div
      className="transform bg-slate-800 text-white text-2xl mt-6
          py-3 px-4 mr-4 rounded-lg shadow-xl flex justify-center items-center
          transition font-serif w-2/12 lg:w-1/12"
    >
      {timeLeft}
    </div>
  );
}
