import { getCard, addPunch, resetCard, addCardTitle } from "../actions/punchCard";
import PunchCard from "../components/punchcard/PunchCard.jsx";


export default async function Dashboard({ username }) {

  const card = await getCard();
  
  return (
    <>
    <main>
      <h1>Hey, {username}</h1>

      <h2>{card.title}</h2>
      <form action={addCardTitle} className="punchCardForm">
        <input 
          type="text" 
          name="title"
          placeholder="Enter punch card name"
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