import '../styles/globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>JSON Formatter & Viewer</title>
        <meta name="description" content="Free online JSON formatter, validator, and viewer. Beautify, minify, and explore JSON data easily." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
