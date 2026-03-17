"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/session";
import { dbConnect } from "../lib/db";
import User from "../lib/models/User";


// find card
export async function getCard() {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);

        console.log("session userId:", session.userId)

    await dbConnect();
    const user = await User.findById(session.userId);

        console.log("user:", user)

    if(!user) return null;

        console.log("punchCard:", user.punchCard)

    return JSON.parse(JSON.stringify(user.punchCard));
}


// punch the card
export async function addPunch() {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);

    await dbConnect();
    const user = await User.findById(session.userId);

    if (!user.punchCard.isFull) { // if card is not full
        user.punchCard.punches += 1; // add punch
        user.punchCard.isFull = user.punchCard.punches >= user.punchCard.maxPunches; // check if card is now full
        await user.save(); // save changes to db
    }
}


// reset card
export async function resetCard() {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);

    await dbConnect();
    await User.findByIdAndUpdate(session.userId, {
        "punchCard.punches": 0,
        "punchCard.isFull": false,
    });
}


// name card
export async function addCardTitle(formData) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    const title = formData.get("title");

    await dbConnect();
    await User.findByIdAndUpdate(session.userId, {
        "punchCard.title": title,
    });
}

