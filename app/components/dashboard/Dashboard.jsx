"use client";

import { useState, useEffect, useCallback } from 'react';
import { getCards } from "../../actions/punchCard";
import DisplayPunchCards from "../punchcard/DisplayPunchCards.jsx";
import TimerWidget from "../timer/TimerWidget";
import CardModal from '../modals/CardModal';
import styles from './Dashboard.module.css';

export default function Dashboard({ username }) {
  const [cards, setCards] = useState([]); 
  const [loading, setLoading] = useState(true);
  /*const [showTimer, setShowTimer] = useState(false);*/
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
        <div className={styles.container}> {/* coud this also be contentcontainer?? */}
          <p>Loading...</p>
        </div>
      );
    }

  return (
    <>
      <h1 className={styles.pageTitle}>Hey, {username}</h1>

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
        /*isOpen={showTimer}
        onClose={() => setShowTimer(false)}*/
      />

      {/* PUNCH CARDS DISPLAY */}
      <DisplayPunchCards 
        cards={cards} 
        className={styles.contentContainer}
        onUpdate={fetchCards}
        openModal={() => setShowCardModal(true)}
      />
  </>
  )
}
