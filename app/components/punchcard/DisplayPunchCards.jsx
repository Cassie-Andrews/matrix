"use client"

import { useState, useMemo } from "react";
import PunchCard from "./PunchCard";
import PunchCardFilters from "../filter/PunchCardFilter";
import CardModal from "../modals/CardModal";
import { getAllTags, filterCards, sortCards, groupCardsByTag } from "../../lib/cardUtils";
import styles from '../punchcard/DisplayPunchCards.module.css';

export default function DisplayPunchCards({ cards }) {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ sortBy, setSortBy ] = useState("dateCreated");
    const [ groupByTag, setGroupByTag ] = useState(false);

    // get tags - https://react.dev/reference/react/useMemo
    const allTags = useMemo(() => getAllTags(cards), [cards]);

    // filter and sort cards
    const processedCards = useMemo(() => {
        const filtered = filterCards(cards, searchQuery, selectedTags);
        return sortCards(filtered, sortBy);
    }, [cards, searchQuery, selectedTags, sortBy]);

    // group cards
    const { grouped, untagged } = useMemo(() => {
        if (groupByTag) {
            return groupCardsByTag(processedCards);
        }
        return { 
            grouped: {},
            untagged: processedCards,
        };
    }, [processedCards, groupByTag]);

    // display
    return (
        <div className={styles.container}>
            <div className={styles.cardControls}>
                <CardModal />
                <PunchCardFilters 
                    allTags={allTags}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    groupByTag={groupByTag}
                    setGroupByTag={setGroupByTag}
                />
            </div>
            
            {/* DISPLAY */}
            {processedCards.length === 0 ? (
                // empty
                <div className={styles.emptyState}>
                    <p> No punch cards yet!</p>
                </div>
            ) : groupByTag ? (
                // tag groups
                <div className={styles.groupedView}>
                    {Object.entries(grouped).sort().map(([tag, tagCards]) => (
                        <div key={tag} className={styles.tagGroup}>
                            <h2 className={styles.tagGroupHeader}>{tag}</h2>
                            <div className={styles.cardsContainer}>
                                {tagCards.map(card => (
                                    <PunchCard 
                                        key={card._id} 
                                        card={card}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {untagged.length > 0 && (
                        <div className={styles.tagGroup}>
                            <h2 className={styles.tagGroupHeader}>Untagged</h2>
                            <div className={styles.cardsContainer}>
                                {untagged.map(card => (
                                    <PunchCard 
                                        key={card._id} 
                                        card={card}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ): (
                <div className={styles.cardsContainer}>
                    {processedCards.map(card => (
                        <PunchCard 
                            key={card._id} 
                            card={card}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
