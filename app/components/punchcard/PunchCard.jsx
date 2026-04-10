"use client";

import { useTransition, useState } from "react";
import Image from "next/image";
import styles from "./PunchCard.module.css";
import CardModal from "../modals/CardModal";
import { setPunches } from "../../actions/punchCard";
import punched from "../../../public/punch-R03.svg";


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


            <div className={styles.cardContent}>
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
                                        height={33}
                                        padding=".5rem"
                                    />
                                ) : (
                                    []
                                    /*
                                    <svg 
                                        className={styles.checkbox}
                                        width={30}
                                        height={30}>
                                        <rect
                                            className={styles.notPunched}
                                            alt="not punched"
                                            width={30}
                                            height={30}
                                            stroke="var(--primary)"
                                            strokeWidth="1px"
                                            fill="var(--light)"
                                        />
                                    </svg>
                                    */
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>


            <div className={styles.buttonGroup}>
                {card.isFull && (
                    <button
                        type="button" 

                        className="primaryButton"
                    >
                        Reset
                    </button>
                )}
                {!card.isFull && (
                    <button
                        className="primaryButton"
                        onClick={() => setIsEditing(true)}
                        title="Edit Card"
                    >
                        <p className="buttonContent">Edit</p>
                    </button>
                )}
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