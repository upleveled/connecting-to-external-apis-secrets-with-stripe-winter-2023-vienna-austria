import Link from 'next/link';

export const metadata = { title: 'Canceled', description: 'Canceled Page' };

export default function CanceledPage() {
  return (
    <section>
      <h1>Failed Transaction</h1>
      <Link href="/">home</Link>
    </section>
  );
}
