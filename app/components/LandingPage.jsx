import Link from 'next/link';

/* styles in global.css */

export default async function LandingPage() {  
  return (
    <>
      <div className="landingContent">
        <h1>Welcome to Matrix</h1>
        <h3>Your punch card study companion</h3>
        <p> <Link href="/login">Login</Link> or <Link href="/signup">Sign up</Link> to start</p>
      </div>
    </>
  );
}