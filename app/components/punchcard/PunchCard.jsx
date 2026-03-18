"use client";

import { useTransition } from "react";
import styles from "./PunchCard.module.css";
import { setPunches, updateCardTitle, deleteCard, resetCard } from "../../actions/punchCard";

export default function PunchCard({ card }) {
    const [isPending, startTransition] = useTransition();
    
    // handle click/tap - punch/unpunch card
    function handlePunch(index) {
        const newPunches = index +1 === card.punches ? index : index + 1; // toggle punch
        const formData = new formData();
        formData.append("cardId", card._id);
        formData.append("punches", newPunches);
        startTransition(() => setPunches(formData));
    }

    return (
        <div className={styles.card}>
            <form action={updateCardTitle}>
                <input type="hidden" name="cardId" value={card._id} />
                <input
                    type="text"
                    name="title"
                    defaultValue={card.title}
                    placeholder="Punch Card Title"
                />
                <button type="submit">Save</button>
            </form>


            <div className={styles.grid}>
                {Array.from({ length: card.maxPunches }).map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.punch} ${i < card.punches ? styles.filled : ""}`}
                        onClick={() => handlePunch(i)}
                        disabled={isPending}
                        type="button"
                    />
                ))}
            </div>


            <p className={styles.counter}>
                {card.punches} / {card.maxPunches}
            </p>
            

            {card.isFull && <p className={styles.full}>You did it!</p>}
            
            
            <form action={resetCard}>
                <input type="hidden" name="cardId" value={card._id} />
                <button type="submit">Reset</button>
            </form>

            <form action={deleteCard}>
                <input type="hidden" name="cardId" value={card._id} />
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}