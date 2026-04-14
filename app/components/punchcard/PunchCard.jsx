"use client";

import { useTransition, useState } from "react";
/*import { useRouter } from "next/navigation";*/
import Image from "next/image";
import styles from "./PunchCard.module.css";
import CardModal from "../modals/CardModal";
import { setPunches, resetCard, deleteCard } from "../../actions/punchCard";
import punched from "../../../public/punch-R03.svg";


export default function PunchCard({ card, onUpdate }) {
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    /*const router = useRouter();*/
    
    // handle click/tap - punch/unpunch card
    function handlePunch(index) {
        const newPunches = index +1 === card.punches ? index : index + 1; // toggle punch
        const data = new FormData();
        data.append("cardId", card._id);
        data.append("punches", newPunches);
        startTransition(async () => {
            await setPunches(data);
            if (onUpdate) onUpdate();
        });
    }

    // handle reset
    async function handleReset() {
        if (!confirm("Are you sure you want to RESET this card?")) return;

        const formData = new FormData();
        formData.append("cardId", card._id);
        
        startTransition(async () => {
            await resetCard(formData);
            if (onUpdate) onUpdate();
        })
        
        startTransition(async () => {
            await resetCard(formData);
            router.refresh();
        });
    }

    // handle delete
    async function handleDelete() {
        if (!confirm("Are you sure you want to PERMANENTLY DELETE this card?")) return;

        const formData = new FormData();
        formData.append("cardId", card._id);
        
        startTransition(async () => {
            await deleteCard(formData);
            if (onUpdate) onUpdate();
        });
    }


    return (
        <div className={styles.card}>
            {/* TITLE */}
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                {/* PROGRESS */}
                <div className={styles.progressContainer}>
                    {card.isFull && (
                        <p className={styles.full}>🎉</p>
                    )}
                    {!card.isFull && (
                        <p className={styles.counter}>
                            {card.punches} / {card.maxPunches}
                        </p>
                    )}
                </div>  
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


            <div className={styles.gridContainer}>
                {card.isFull && (
                    <div className={styles.successMessage}>
                        <h2>You did it!!</h2>
                    </div>
                )}
                {!card.isFull && (
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
                                        src={punched}
                                        alt="punched"
                                        width={33}
                                        height="auto"
                                        padding=".5rem"
                                    />
                                ) : null}
                            </button>
                        ))}
                    </div>
                )}
            </div>


            <div className={styles.buttonGroup}>
                {card.isFull ? (
                    <div className={styles.fullCardButtons}>
                        <button
                            type="button"
                            onClick={handleReset} 
                            disabled={isPending} 
                            className={styles.resetButton}
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isPending} 
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <button
                        className={styles.editButton}
                        onClick={() => setIsEditing(true)}
                        title="Edit Card"
                    >
                       Edit
                    </button>
                )}
            </div>

            {/* EDIT CARD MODAL */}
            {isEditing && (
                <CardModal 
                    card={card}
                    onClose={() => {
                        setIsEditing(false);
                        if (onUpdate) onUpdate();
                    }}
                />
            )}
        </div>
    );
}