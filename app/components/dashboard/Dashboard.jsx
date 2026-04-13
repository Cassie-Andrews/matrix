"use client";

import { useState, useEffect } from 'react';
import { getCards } from "../../actions/punchCard";
import DisplayPunchCards from "../punchcard/DisplayPunchCards.jsx";
import Pomodoro from "../pomodoro/PomodoroWidget";
import CardModal from '../modals/CardModal';
import { PiTimer } from 'react-icons/pi';
import styles from './Dashboard.module.css';

export default function Dashboard({ username }) {
  const [cards, setCards] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    async function fetchCards() {
      try {
        const fetchedCards = await getCards();
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hey, {username}</h1>
        
        <div className={styles.buttonGroup}>
          {/* NEW PUNCH CARD BUTTON */}
          <button
            className={styles.createButton} 
            onClick={() => setShowCardModal(true)}
          >
              New Punch Card
          </button>

          {/* TIMER BUTTON */}
          <button
            className={styles.timerButton}
            onClick={() => setShowPomodoro(!showPomodoro)}
          >
            <PiTimer /> {showPomodoro ? "Hide Timer" : "Show Timer"}
          </button>
        </div>
      </div> 

      {/* ADD CARD MODAL */}
      {showCardModal && (
        <CardModal 
          onClose={() => setShowCardModal(false)}
        />
      )}

      {/* TIMER WIDGET */}
      <Pomodoro 
        isOpen={showPomodoro}
        onClose={() => setShowPomodoro(false)}
      />

      {/* PUNCH CARDS DISPLAY */}
      <DisplayPunchCards 
        cards={cards} 
        className={styles.contentContainer}
        />
    </div>
  );
}