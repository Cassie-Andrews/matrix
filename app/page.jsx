import { getCard, addPunch, resetCard, addCardTitle } from "./actions/punchCard";
import PunchCard from "@/components/PunchCard";

export default async function Home() {
  const card = await getCard();
  
  return (
    <div className="container">
      <h1>{card.title}</h1>

      <form action={addCardTitle}>
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

    <form action={addPunch}>
      <button disabled={card.isFull}>Add punch</button>
    </form>
    
    <form action={resetCard}>
      <button>Reset</button>
    </form>

    </div>
  );
}