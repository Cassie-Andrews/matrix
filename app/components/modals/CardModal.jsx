"use client";

import { useState } from "react";
import { addCard, updateCardTitle, updatePunchCardTags } from "@/app/actions/punchCard";
import styles from "./CardModal.module.css";

export default function CardModal({ card = null, onClose }) {
    const isEditing = !!card;
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(formData) {
        if (isEditing) {
            const cardId = card._id;
            const title = formData.get("title");
            const tagString = formData.get("tags");

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
        } else {
            await addCard(formData);
        }

        setIsOpen(false);
        if (onClose) onClose();
    }

    if(!isOpen && !isEditing) return null;

    return (
        <>
            {!isEditing && (
                <button className={styles.createButton} onClick={() => setIsOpen(true)}>
                    Create Card
                </button>
            )}

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
                            {!isEditing && (
                                <div className={styles.formGroup}>
                                    <label htmlFor="maxPunches">Max Punches</label>
                                    <input 
                                        type="number"
                                        id="maxPunches"
                                        name="maxPunches"
                                        placeholder="Set max punches"
                                        defaultValue={10}
                                        min={1}
                                        max={28}
                                    />
                                </div>
                            )}

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