
import { getCards } from "../actions/punchCard";
import PunchCard from "../components/punchcard/PunchCard.jsx";
import { getAllTags, filterCards, sortCards, groupCardsByTag } from "../lib/cardUtils";
import CardModal from "./modals/CardModal.jsx";

import Pomodoro from "../components/pomodoro/Pomodoro";


export default async function Dashboard({ username }) {
  const cards = await getCards(); 
  
  return (
    <>
      <h1>Hey, {username}</h1>
      <CardModal />
      <div className="cardsContainer">
        {cards.length === 0 && (
          <p> No punch cards yet!</p>
        )}
        {cards.map((card) => (
          <PunchCard key={card._id} card={card} />
        ))}
      </div>
      <Pomodoro />
    </>
  );
}