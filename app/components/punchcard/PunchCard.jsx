"use client";

import { useTransition, useState } from "react";
import Image from "next/image";
import styles from "./PunchCard.module.css";
import CardModal from "../modals/CardModal";
import { setPunches, updateCardTitle, updatePunchCardTags, deleteCard, resetCard } from "../../actions/punchCard";
import punched from "../../../public/punched.svg";
import notPunched from "../../../public/notPunched.svg";
import { set } from "mongoose";

export default function PunchCard({ card }) {
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    
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
            {/* TITLE */}
            <div className={styles.header}>
                <h3 className={styles.title}>{card.title}</h3>
                <button
                    className={styles.editButton}
                    onClick={() => setIsEditing(true)}
                    title="Edit Card"
                >
                    Edit
                </button>
            </div>

            {/* TAGS */}
            {card.tags && card.tags.length > 0 && (
                <div className={styles.tagsContainer}>
                    {card.tags.map((tag, idx) => (
                        <span key={idx} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* MAX PUNCHES */}
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

            {/* PROGRESS */}
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
            
            {/* BUTTONS - RESET/DELETE */}
            <div className={styles.buttonContainer}>
                {/* reset button */}
                <form action={resetCard}>
                    <input type="hidden" name="cardId" value={card._id} />
                    <button type="submit" className={styles.resetButton}>
                        Reset
                    </button>
                </form>
                {/* delete button */}
                <form action={deleteCard}>
                    <input type="hidden" name="cardId" value={card._id} />
                    <button type="submit" className={styles.deleteButton}>
                        Delete
                    </button>
                </form>
            </div>

            {/* EDIT CARD MODAL */}
            {isEditing && (
                <CardModal 
                    card={card}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
}