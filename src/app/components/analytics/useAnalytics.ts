'use client';

import { useCallback, useEffect, useState } from 'react';
import { event, trackEcommerce, setUserProperties, isGAReady, GAEventParams } from './GoogleAnalytics';

/**
 * Hook for easy access to analytics functions with type safety
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { trackEvent, trackPurchase, ready } = useAnalytics();
 *
 *   const handleClick = () => {
 *     trackEvent({
 *       action: 'click',
 *       category: 'button',
 *       label: 'signup'
 *     });
 *   };
 *
 *   return (
 *     <button onClick={handleClick} disabled={!ready}>
 *       Sign Up
 *     </button>
 *   );
 * }
 * ```
 */
export function useAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if GA is ready
    const checkReady = () => {
      setReady(isGAReady());
    };

    checkReady();

    // Recheck periodically
    const interval = setInterval(checkReady, 1000);

    return () => clearInterval(interval);
  }, []);

  const trackEvent = useCallback((params: GAEventParams) => {
    if (!ready) {
      console.warn('[useAnalytics] GA not ready yet, event queued:', params);
    }
    event(params);
  }, [ready]);

  const trackPurchase = useCallback((
    transactionId: string,
    value: number,
    currency: string = 'PLN',
    items: Array<{
      item_id: string;
      item_name: string;
      price: number;
      quantity: number;
    }>
  ) => {
    trackEcommerce('purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items
    });
  }, []);

  const trackAddToCart = useCallback((
    itemId: string,
    itemName: string,
    price: number,
    quantity: number = 1,
    currency: string = 'PLN'
  ) => {
    trackEcommerce('add_to_cart', {
      currency,
      value: price * quantity,
      items: [{
        item_id: itemId,
        item_name: itemName,
        price,
        quantity
      }]
    });
  }, []);

  const trackViewItem = useCallback((
    itemId: string,
    itemName: string,
    price: number,
    currency: string = 'PLN'
  ) => {
    trackEcommerce('view_item', {
      currency,
      value: price,
      items: [{
        item_id: itemId,
        item_name: itemName,
        price,
        quantity: 1
      }]
    });
  }, []);

  const setUser = useCallback((properties: Record<string, unknown>) => {
    setUserProperties(properties);
  }, []);

  return {
    ready,
    trackEvent,
    trackPurchase,
    trackAddToCart,
    trackViewItem,
    setUser
  };
}

/**
 * Hook for tracking component mount/unmount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   usePageView('MyComponent'); // Tracks when component mounts
 *
 *   return <div>Content</div>;
 * }
 * ```
 */
export function usePageView(componentName: string) {
  useEffect(() => {
    event({
      action: 'view',
      category: 'component',
      label: componentName
    });
  }, [componentName]);
}

/**
 * Hook for tracking form submissions
 *
 * @example
 * ```tsx
 * function ContactForm() {
 *   const { trackSubmit, trackError } = useFormTracking('contact_form');
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     try {
 *       await submitForm();
 *       trackSubmit();
 *     } catch (error) {
 *       trackError(error.message);
 *     }
 *   };
 *
 *   return <form onSubmit={handleSubmit}>...</form>;
 * }
 * ```
 */
export function useFormTracking(formName: string) {
  const trackStart = useCallback(() => {
    event({
      action: 'start',
      category: 'form',
      label: formName
    });
  }, [formName]);

  const trackSubmit = useCallback(() => {
    event({
      action: 'submit',
      category: 'form',
      label: formName
    });
  }, [formName]);

  const trackError = useCallback((errorMessage: string) => {
    event({
      action: 'error',
      category: 'form',
      label: formName,
      error_message: errorMessage
    });
  }, [formName]);

  return {
    trackStart,
    trackSubmit,
    trackError
  };
}

/**
 * Hook for tracking button clicks
 *
 * @example
 * ```tsx
 * function SignUpButton() {
 *   const handleClick = useButtonTracking('signup_button', 'cta');
 *
 *   return <button onClick={handleClick}>Sign Up</button>;
 * }
 * ```
 */
export function useButtonTracking(buttonName: string, category: string = 'button') {
  return useCallback((additionalParams?: Record<string, unknown>) => {
    event({
      action: 'click',
      category,
      label: buttonName,
      ...additionalParams
    });
  }, [buttonName, category]);
}
