"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/session";
import { dbConnect } from "../lib/db";
import { revalidatePath } from "next/cache";
import User from "../lib/models/User";



// find cards
export async function getCards() {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
        console.log("session userId:", session.userId)
    await dbConnect();
    const user = await User.findById(session.userId);
        console.log("user:", user) 
    if(!user) return [];
        console.log("punchCards:", user.punchCards)
    return JSON.parse(JSON.stringify(user.punchCards));
}


// add a card
export async function addCard(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    const title = formData.get("title");
    const maxPunches = parseInt(formData.get("maxPunches")) || 14;
    await dbConnect();
    await User.findByIdAndUpdate(session.userId, {
        $push: {
            punchCards: { title, maxPunches, punches: 0, isFull: false }
        }
    });
    revalidatePath("/");
}


// punch or un-punch a card
export async function setPunches(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    const cardId = formData.get("cardId");
    const punches = parseInt(formData.get("punches"));
    await dbConnect();
    const user = await User.findById(session.userId);
    const card = user.punchCards.id(cardId);
    if (!card) return;
    card.punches = punches;
    card.isFull = punches >= card.maxPunches; // check if card is now full
    await user.save();
    revalidatePath("/");
}


// reset a card
export async function resetCard(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    const cardId = formData.get("cardId");
    await dbConnect();
    const user = await User.findByIdAndUpdate(session.userId);
    const card = user.punchCards.id(cardId);
    if (!card) return;
    card.punches = 0;
    card.isFull = false;
    await user.save();
    revalidatePath("/");
}


// update card title
export async function updateCardTitle(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    const cardId = formData.get("cardId");
    const title = formData.get("title");
    await dbConnect();
    await User.findByIdAndUpdate(
        { _id: session.userId, "punchCards.id": cardId },
        { $set: { "punchCards.$.title": title}}
    );
    revalidatePath("/");
}


// add/update card tags
export async function updatePunchCardTags(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    const cardId = formData.get("cardId");
    const tagsString = formData.get("tags");

    const tags = tagsString
        ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

    await dbConnect();
    const user = await User.findById(session.userId);
    const card = user.punchCards.id(cardId);

    if(!card) return;

    card.tags = tags;
    await user.save();

    revalidatePath("/");
}

// delete a card
export async function deleteCard(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    const cardId = formData.get("cardId");
    await dbConnect();
    await User.findByIdAndUpdate(session.userId, {
        $pull: { punchCards: { _id: cardId }}
    });
    revalidatePath("/");
}
