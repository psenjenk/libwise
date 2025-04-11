import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Welcome to LibWise
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your command-line library management system.
      </p>
      <Link href="/cli" className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors">
        Go to CLI
      </Link>
    </div>
  );
}
