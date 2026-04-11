import { getCards } from "../actions/punchCard";
import DisplayPunchCards from "./punchcard/DisplayPunchCards.jsx";
import Pomodoro from "./pomodoro/PomodoroWidget";


export default async function Dashboard({ username }) {
  const cards = await getCards(); 
  
  return (
    <>
      <h1>Hey, {username}</h1>
      <DisplayPunchCards 
        cards={cards} 
        className="contentContainer"
      />
      <Pomodoro />
    </>
  );
}