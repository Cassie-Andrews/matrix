import Link from 'next/link';

export default async function LandingPage() {  
  return (
    <main>
        <h1>Landing page - not logged in</h1>
        <p> <Link href="/login">Login</Link> or <Link href="/signup">Sign up</Link> to start</p>
    </main>
  );
}