export function getAllTags(cards) {
    const tagSet = new Set();
    cards.forEach(card => {
        if (card.tags && Array.isArray(card.tags)) {
            card.tags.forEach(tag => tagSet.add(tag));
        }
    });
    return Array.from(tagSet).sort();
}

export function filterCards(cards, searchQuery, selectedTags) {
    return cards.filter(card => {
        const matchesSearch = !searchQuery ||
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (card.tags && card.tags.some(tag =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            ));

        const matchesTags = selectedTags.length === 0 ||
            (card.tags && selectedTags.every(tag => card.tags.includes(tag)));

        return matchesSearch && matchesTags;
    });
}

export function sortCards(cards, sortBy) {
    const sorted = [...cards];

    switch(sortBy) {
        case "dateCreated":
            return sorted.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            
        case "dateCreatedOld":
            return sorted.sort((a, b) =>
                new Date(a.createdAt) - new Date(b.createdAt)
            );

        case "dateEdited":
            return sorted.sort((a, b) =>
                new Date(b.updatedAt) - new Date(a.updatedAt || a.createdAt)
            );

        case "titleAZ":
            return sorted.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

        case "titleZA":
            return sorted.sort((a, b) =>
                b.title.localeCompare(a.title)
            );

        case "maxPunchesHigh":
            return sorted.sort((a, b) =>
                b.maxPunches - a.maxPunches
            );

        case "maxPunchesLow":
            return sorted.sort((a, b) =>
                a.maxPunches - b.maxPunches
            );

        case "progress":
            return sorted.sort((a, b) => {
                const progressA = (a.punches / a.maxPunches) * 100;
                const progressB = (b.punches / b.maxPunches) * 100;
                return progressB - progressA;
        });

        default:
            return sorted;
    }
}

export function groupCardsByTag(cards) {
    const grouped = {};
    const untagged = [];

    cards.forEach(card => {
        if (!card.tags || card.tags.length === 0 ) {
            untagged.push(card);
        } else {
            card.tags.forEach(tag => {
                if (!grouped[tag]) {
                    grouped[tag] = [];
                }
                grouped[tag].push(card);
            });
        }
    });

    return { grouped, untagged };
}

