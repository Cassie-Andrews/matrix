"use client";
import {useState } from "react";
import { addCard } from "@/app/actions/punchCard";
import styles from "./AddCardModal.module.css";

export default function AddCardModal() {
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(formData) {
        await addCard(formData);
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Create Card</button>

            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h2>Create New Punch Card</h2>
                        <form action={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Punch Card Title"
                                required
                            />
                            <input 
                                type="number"
                                name="maxPunches"
                                placeholder="Set max punches"
                                defaultValue={10}
                                min={1}
                                max={31}
                            />
                            <div>
                                <button type="submit">Create</button>
                                <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}