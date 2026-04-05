export function getAllTags(cards) {
    const tagSet = new Set();
    cards.forEach(card => {
        if (card.tags && Array.isArray(card.tags)) {
            card.tags.forEach(tag => tagSet.add(tag));
        }
    });
    return Array.from(tagSet).sort();
}

export function filterCards() {
    
}

export function sortCards() {
    
}

export function groupCardsByTag() {
    
}

