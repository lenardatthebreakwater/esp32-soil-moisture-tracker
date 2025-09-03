import './globals.css'

export const metadata = {
  title: 'Soil Moisture Monitor',
  description: 'Real-time soil monitoring dashboard powered by LoRa + ESP32',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 antialiased">
        {children}
      </body>
    </html>
  )
}
