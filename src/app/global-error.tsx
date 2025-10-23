"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-destructive">
              Coś poszło nie tak!
            </h1>
            <p className="text-muted-foreground">
              Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
            </p>
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Spróbuj ponownie
          </button>
        </div>
      </body>
    </html>
  );
}
