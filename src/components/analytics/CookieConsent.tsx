'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { updateConsent } from './GoogleAnalytics';
import { X } from 'lucide-react';

interface CookieConsentProps {
  position?: 'bottom' | 'top';
  onAccept?: () => void;
  onReject?: () => void;
}

/**
 * GDPR-compliant Cookie Consent Banner
 *
 * Features:
 * - Persistent storage of user preference
 * - Integrates with GA4 consent API
 * - Customizable position
 * - Accessible keyboard navigation
 * - Auto-hide after choice
 */
export function CookieConsent({
  position = 'bottom',
  onAccept,
  onReject
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookie_consent');

    if (consentGiven === null) {
      // Show banner if no previous choice
      setIsVisible(true);
    } else {
      // Apply previous consent choice
      updateConsent(consentGiven === 'accepted');
    }

    setIsLoaded(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    updateConsent(true);
    setIsVisible(false);
    onAccept?.();
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    updateConsent(false);
    setIsVisible(false);
    onReject?.();
  };

  const handleClose = () => {
    // Treat close as rejection
    handleReject();
  };

  // Don't render anything until loaded (avoid hydration issues)
  if (!isLoaded || !isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Message */}
            <div className="flex-1 pr-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  🍪
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Używamy plików cookie
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ta strona używa Google Analytics do analizy ruchu i poprawy jakości usług.
                    Możesz zaakceptować wszystkie pliki cookie lub je odrzucić.{' '}
                    <a
                      href="/polityki/prywatnosc"
                      className="underline hover:text-gray-900 dark:hover:text-white"
                      target="_blank"
                    >
                      Więcej informacji
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="min-w-[100px]"
              >
                Odrzuć
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="min-w-[100px]"
              >
                Akceptuj
              </Button>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Zamknij"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to check current consent status
 */
export function useConsentStatus() {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'accepted') {
      setStatus('accepted');
    } else if (consent === 'rejected') {
      setStatus('rejected');
    }
  }, []);

  return status;
}

/**
 * Function to reset consent (for testing or settings page)
 */
export function resetConsent() {
  localStorage.removeItem('cookie_consent');
  window.location.reload();
}
