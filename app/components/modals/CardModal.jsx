"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCard, updateCardTitle, updatePunchCardTags, updateMaxPunches } from "@/app/actions/punchCard";
import styles from "./CardModal.module.css";

export default function CardModal({ card = null, onClose }) {
    const router = useRouter();
    const isEditing = !!card;
    const [isOpen, setIsOpen] = useState(!card);

    async function handleSubmit(formData) {
        if (isEditing) {
            const cardId = card._id;
            const title = formData.get("title");
            const tagString = formData.get("tags");
            const maxPunches = formData.get("maxPunches");

            // title
            const titleData = new FormData();
            titleData.append("cardId", cardId);
            titleData.append("title", title);
            await updateCardTitle(titleData);

            // tags
            const tagsData = new FormData();
            tagsData.append("cardId", cardId);
            tagsData.append("tags", tagString);
            await updatePunchCardTags(tagsData);

            // punches
            const maxPunchesData = new FormData();
            maxPunchesData.append("cardId", cardId);
            maxPunchesData.append("maxPunches", maxPunches);
            await updateMaxPunches(maxPunchesData);
        } else {
            await addCard(formData);
        }
        router.refresh();
        setIsOpen(false);
        if (onClose) onClose();
    }

    if(!isOpen && !isEditing) return (
        <>
        {!isEditing && (
                <button className={styles.createButton} onClick={() => setIsOpen(true)}>
                    New Punch Card
                </button>
            )}
        </>
    );

    return (
        <>
            {(isOpen || isEditing) && (
                <div 
                className={styles.overlay} 
                onClick={() => {
                    setIsOpen(false);
                    if (onClose) onClose();
                }}>

                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>{isEditing ? "Edit Punch Card" : "Create New Punch Card"}</h2>
                        
                        <form action={handleSubmit} className={styles.form}>
                            {/* TITLE */}
                            <div className={styles.formGroup}>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Punch Card Title"
                                    defaultValue={card?.title || ""}
                                    required
                                />
                            </div>
                            
                            {/* TAGS */}
                            <div className={styles.formGroup}>
                                <label htmlFor="tags">Tags (optional)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    placeholder="Add custom tags separated by commas"
                                    defaultValue={card?.tags?.join(', ') || ""}
                                />
                            </div>

                            {/* MAX PUNCHES */}
                            <div className={styles.formGroup}>
                                <label htmlFor="maxPunches">Max Punches</label>
                                <input 
                                    type="number"
                                    id="maxPunches"
                                    name="maxPunches"
                                    placeholder="Set max punches"
                                    defaultValue={card?.maxPunches || 14}
                                    min={1}
                                    max={28}
                                />
                                {isEditing && (
                                    <small className={styles.helpText}>
                                        Current: {card.punches} / {card.maxPunches}
                                    </small>
                                )}
                            </div>
                            

                            <div className={styles.buttonGroup}>
                                <button 
                                    type="button" 
                                    className={styles.cancelButton}
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (onClose) onClose();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button                
                                    type="submit"
                                    className={styles.saveButton}>
                                        {isEditing ? "Save Changes" : "Create Card"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}