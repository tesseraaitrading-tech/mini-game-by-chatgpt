import './globals.css';

export const metadata = {
  title: 'Tic-Tac-Toe | Mini Game by ChatGPT',
  description: 'A classic Tic-Tac-Toe game built with Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
