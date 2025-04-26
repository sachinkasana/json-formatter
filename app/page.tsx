import JsonFormatter from '../components/JsonFormatter';

export default function Home() {
  return (
    <main className="py-10">
      <h1 className="text-3xl font-bold text-center mb-8">JSON Formatter & Beautifier</h1>
      <JsonFormatter />
    </main>
  );
}
