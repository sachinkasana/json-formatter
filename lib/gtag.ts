declare global {
    interface Window {
      gtag: (...args: any[]) => void;
    }
  }
  
  export const trackEvent = ({
    action,
    category,
    label,
  }: {
    action: string;
    category: string;
    label: string;
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  };
  