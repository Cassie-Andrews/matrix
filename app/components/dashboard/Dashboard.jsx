"use client";

import { useState, useEffect, useCallback } from 'react';
import { getCards } from "../../actions/punchCard";
import DisplayPunchCards from "../punchcard/DisplayPunchCards.jsx";
import TimerWidget from "../timer/TimerWidget";
import CardModal from '../modals/CardModal';
import { PiTimer } from 'react-icons/pi';
import styles from './Dashboard.module.css';

export default function Dashboard({ username }) {
  const [cards, setCards] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);


  const fetchCards = useCallback(async () => {
    try {
      const fetchedCards = await getCards();
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

    useEffect(() => {
      fetchCards();
    }, [fetchCards]);

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
            onClick={() => setShowTimer(!showTimer)}
          >
            <PiTimer /> {showTimer ? "Hide Timer" : "Show Timer"}
          </button>
        </div>
      </div> 

      {/* ADD CARD MODAL */}
      {showCardModal && (
        <CardModal 
          onClose={() => {
            setShowCardModal(false);
            fetchCards();
          }}
        />
      )}

      {/* TIMER WIDGET */}
      <TimerWidget
        isOpen={showTimer}
        onClose={() => setShowTimer(false)}
      />

      {/* PUNCH CARDS DISPLAY */}
      <DisplayPunchCards 
        cards={cards} 
        className={styles.contentContainer}
        onUpdate={fetchCards}
        />
    </div>
  );
}