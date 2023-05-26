import './globals.css'
import localFont from 'next/font/local'
import "@fortawesome/fontawesome-svg-core/styles.css"

const oswald = localFont({
  src: '../public/fonts/Oswald-VariableFont_wght.ttf',
  variable: '--font-oswald'
})

const comme = localFont({
  src: '../public/fonts/Comme-VariableFont_wght.ttf',
  variable: '--font-comme'
})

export const metadata = {
  title: 'Jud weather forecast',
  description: 'Designed by Jud',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${comme.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  )
}
