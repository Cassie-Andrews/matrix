"use server";

import { revalidatePath } from "next/cache";

let card = {
    title: "New Habit",
    punches: 0,
    maxPunches: 14,
}
/*console.log("Punches used: ", {card.punches}, "/", {card.maxPunches})*/


// find card
export async function getCard() {
    return { 
        ...card,
        isFull: card.punches >= card.maxPunches,
    };
}

// name card
export async function addCardTitle(formData) {
    const title = formData.get("habitTitle");
    card.title = title || "Untitled Habit";

    revalidatePath("/");

}

// punch the card
export async function addPunch() {
    if (card.punches < card.maxPunches) {
        card.punches += 1; // add punch
    }

    revalidatePath("/");

    /*console.log("Punches used: ", {card.punches}, "/", {card.maxPunches})*/
    return { card, isFull: card.punches >= card.maxPunches };
}

// reset card
export async function resetCard() {
    card.punches = 0;

    revalidatePath("/");

    /*console.log("Card has been RESET - Punches used: ", {card.punches}, "/", {card.maxPunches})*/
    return { card }
}
