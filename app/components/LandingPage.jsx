import Link from 'next/link';

/* styles in global.css */

export default async function LandingPage() {  
  return (
    <>
      <div className="landingContent">
        <h1>Welcome to MATRIX</h1>
        <h2>Your punch card study companion</h2>
        <p> <Link href="/login">Login</Link> or <Link href="/signup">Sign up</Link> to start</p>
      </div>
    </>
  );
}