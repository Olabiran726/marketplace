import './globals.css';

export const metadata = {
  title: 'Marketplace',
  description: 'Simple marketplace app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <header style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '1rem 2rem',
          textAlign: 'center'
        }}>
          <h1>My Marketplace</h1>
        </header>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
        <footer style={{
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#f0f0f0',
          marginTop: '2rem'
        }}>
          &copy; {new Date().getFullYear()} My Marketplace
        </footer>
      </body>
    </html>
  );
}
