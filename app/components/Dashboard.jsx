import { getCards } from "../actions/punchCard";
import CardModal from "./modals/CardModal.jsx";
import DisplayPunchCards from "./punchcard/DisplayPunchCards.jsx";
import Pomodoro from "../components/pomodoro/Pomodoro";


export default async function Dashboard({ username }) {
  const cards = await getCards(); 
  
  return (
    <>
      <h1>Hey, {username}</h1>
      <CardModal />
      <DisplayPunchCards cards={cards} />
      <Pomodoro />
    </>
  );
}