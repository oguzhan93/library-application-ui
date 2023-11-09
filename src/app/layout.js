import { Inter } from 'next/font/google'
import "devextreme/dist/css/dx.material.blue.light.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Library Application',
  description: 'Made by, oguzhansancar93@icloud.com',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
