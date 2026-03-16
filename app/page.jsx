import { getCard, addPunch, resetCard, addCardTitle } from "./punchcards/punchCard";
import Header from '@/app/components/header/Header.jsx';
import PunchCard from "@/app/components/punchcard/PunchCard";

// page to expose a route
// https://nextjs.org/docs/app/api-reference/file-conventions/page
// The page file allows you to define UI that is unique to a route. You can create a page by default exporting a component from the file:

export default async function Home() {
  /*return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello world!</h1>
    </main>
  );

  */
 const card = await getCard();
  
  return (
    <>
    <Header/>
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
    </>
  );
}