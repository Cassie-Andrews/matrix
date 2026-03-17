import Link from 'next/link';
import { logout } from '@/app/actions/auth';

import { getCard, addPunch, resetCard, addCardTitle } from "../actions/punchCard.js";
import PunchCard from "@/app/components/punchcard/PunchCard";


export default async function Dashboard({ username: { username } }) {

  const card = await getCard();
  
  return (
    <>
    <main>
      <h1>Hey, {username}</h1>

      <h2>{card.title}</h2>
      <form action={addCardTitle} className="punchCardForm">
        <input 
          type="text" 
          name="habitTitle"
          placeholder="Enter habit name"
          defaultValue={card.title}
          />
        <button>Save</button>
      </form>
    
      <PunchCard
        punches={card.punches}
        maxPunches={card.maxPunches}
        isFull={card.isFull}
        />

      <div className="buttonContainer">
        <form action={addPunch}>
          <button disabled={card.isFull}>Add punch</button>
        </form>
        <form action={resetCard}>
          <button>Reset</button>
        </form>
      </div>
    </main>
    </>
  );
}