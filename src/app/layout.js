import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Add console log for debugging
console.log('Initializing root layout');

export const metadata = {
  title: 'Mukilan Portfolio',
  description: 'Luxury portfolio showcasing expertise in app development, automation, and robotics',
}

export default function RootLayout({ children }) {
  console.log('Rendering root layout');
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@200;300;400;500;600&family=Roboto+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
