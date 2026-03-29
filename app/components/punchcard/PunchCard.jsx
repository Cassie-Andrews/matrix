"use client";

import { useTransition } from "react";
import Image from "next/image";
import styles from "./PunchCard.module.css";
import { setPunches, updateCardTitle, deleteCard, resetCard } from "../../actions/punchCard";
import punched from "../../../public/punched.svg";
import notPunched from "../../../public/notPunched.svg";

export default function PunchCard({ card }) {
    const [isPending, startTransition] = useTransition();
    
    // handle click/tap - punch/unpunch card
    function handlePunch(index) {
        const newPunches = index +1 === card.punches ? index : index + 1; // toggle punch
        const data = new FormData();
        data.append("cardId", card._id);
        data.append("punches", newPunches);
        startTransition(() => setPunches(data));
    }

    return (
        <div className={styles.card}>
            <form className={styles.inputContainer} action={updateCardTitle}>
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
                        onClick={() => handlePunch(i)}
                        disabled={isPending}
                        type="button"
                        className={styles.punch}
                    >
                        {i < card.punches ? (
                            <Image 
                                src="punched.svg"
                                alt="punched"
                                width={33}
                                height={33}
                            />
                        ) : (
                            <Image 
                                src="notPunched.svg"
                                alt="not punched"
                                width={30}
                                height={30}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className={styles.progressContainer}>
                {card.isFull && (
                     <p className={styles.full}>You did it!</p>
                )}
                {!card.isFull && (
                     <p className={styles.counter}>
                        {card.punches} / {card.maxPunches}
                    </p>
                )}
            </div>
            
            <div className={styles.buttonContainer}>
                <form action={resetCard}>
                    <input type="hidden" name="cardId" value={card._id} />
                    <button type="submit">Reset</button>
                </form>

                <form action={deleteCard}>
                    <input type="hidden" name="cardId" value={card._id} />
                    <button type="submit">Delete</button>
                </form>
            </div>
        </div>
    )
}