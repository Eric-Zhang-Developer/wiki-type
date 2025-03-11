
export interface TimerProps {
  timeLeft : number;
  isRunning : boolean;
  onTimeChange : (newTime : number) => void;
  onGameEnd : () => void; 
}