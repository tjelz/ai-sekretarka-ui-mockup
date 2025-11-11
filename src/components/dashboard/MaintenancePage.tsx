'use client';

import { Construction, Home, Mail } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * MaintenancePage Component
 *
 * A professional maintenance page displayed when the dashboard is under construction.
 * Features:
 * - Centered, responsive layout
 * - Dark mode support
 * - Polish language content
 * - Navigation options (home, contact)
 * - Consistent styling with dashboard theme
 */
export function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-2xl rounded-xl shadow-2xl border-gray-200 dark:border-gray-800">
        <CardHeader className="text-center space-y-6 pt-12 pb-6">
          {/* Construction Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-6">
              <Construction className="h-20 w-20 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
              Panel w Przygotowaniu
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-gray-600 dark:text-gray-400 px-4">
              Nasz zespół intensywnie pracuje nad stworzeniem najlepszego
              doświadczenia dla Ciebie. Wróć wkrótce!
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-12 px-6">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary Button - Home */}
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              size="lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span>Powrót do strony głównej</span>
              </Link>
            </Button>

            {/* Outline Button - Contact */}
            <Button
              asChild
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 transition-colors"
              size="lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>Skontaktuj się z nami</span>
              </Link>
            </Button>
          </div>

          {/* Optional: Progress indicator or timeline */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Pracujemy nad nowymi funkcjami, aby lepiej służyć Twoim
              potrzebom
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
