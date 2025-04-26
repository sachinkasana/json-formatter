import Script from 'next/script';
import '../styles/globals.css';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'JSON Formatter & Viewer – Free Online Tool',
    description: 'Instantly format, beautify, validate, and view your JSON data online. Fast, free, and easy-to-use JSON formatter.',
    metadataBase: new URL('https://json-formatter-dev.vercel.app'),
    openGraph: {
      title: 'JSON Formatter & Viewer',
      description: 'Format and visualize JSON effortlessly. Built by Sachin Kasana.',
      url: 'https://json-formatter-dev.vercel.app',
      siteName: 'JSON Formatter',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'JSON Formatter OG Image',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'JSON Formatter – Free Online Tool',
      description: 'Format, validate, and view JSON data in seconds.',
      images: ['/og-image.png'],
    },
  };
  
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="8vtWTaRmZ99VNeEg14rA299KcPo0M6ZQcNjnMAHk7B0" />
        {/* Google Analytics */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-XNVRWP9VEF`} />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XNVRWP9VEF');
          `}
        </Script>
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
