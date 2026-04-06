"use client";
import { useState } from "react";
import { PiFunnel } from "react-icons/pi";
import styles from "./PunchCardFilter.module.css";

export default function PunchCardFilters({
    allTags,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    sortBy,
    setSortBy,
    groupByTag,
    setGroupByTag
}) {
    const [showFilters, setShowFilters] = useState(false);

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedTags([]);
        setSortBy("dateCreated");
        setGroupByTag(false);
    };

    return (
        <div className={styles.filtersContainer}>
            {/* Search Bar */}
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search cards by title or tag"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                {searchQuery && (
                    <button
                        className={styles.clearSearch}
                        onClick={() => setSearchQuery("")}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Filter */}
            <div className={styles.filterControls}>
                <button
                    className={styles.filterToggle}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <PiFunnel /> {selectedTags.length > 0 && `(${selectedTags.length})`}
                </button>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.sortSelect}
                >
                    <option value="dateCreated">Date Created (Newest)</option>
                    <option value="dateCreatedOld">Date Created (Oldest)</option>
                    <option value="dateEdited">Recently Edited</option>
                    <option value="titleAZ">Title (A-Z)</option>
                    <option value="titleZA">Title (Z-A)</option>
                    <option value="maxPunchesHigh">Max Punches (High-Low)</option>
                    <option value="maxPunches">Max Punches (Low-High)</option>
                    <option value="progress">Progress (High-Low)</option>
                </select>

                {/* Group by Tag */}
                <label className={styles.groupToggle}>
                    <input
                        type="checkbox"
                        checked={groupByTag}
                        onChange={(e) => setGroupByTag(e.target.checked)}
                    />
                        Group by Tag
                </label>

                {/* Clear */}
                
            </div>
        </div>
    )
}