"use client"

import { useState, useMemo } from "react";
import { getCards } from "../actions/punchCard";
import PunchCard from "../components/punchcard/PunchCard.jsx";



import Pomodoro from "../components/pomodoro/Pomodoro";
import CardModal from "./modals/CardModal.jsx";


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