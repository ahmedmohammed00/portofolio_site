import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <span className="mono teal">404 / CONNECTION NOT FOUND</span>
      <h1>This route goes nowhere.</h1>
      <p>Let’s get you back to something useful.</p>
      <Link href="/" className="button button-primary">
        Back to the portfolio ↗
      </Link>
    </main>
  );
}
