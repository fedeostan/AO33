import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'

// Reemplazar con tu ID de Google Analytics
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

export const metadata: Metadata = {
  title: 'AO33 | Pure Goalkeeping',
  description: 'Guantes de arquero profesionales AO33. Diseñados con la experiencia del entrenador de arqueros de la Selección Colombia. Calidad premium, identidad nacional.',
  keywords: 'AO33, guantes arquero, guantes portero, colombia, selección colombia, profesional, goalkeeper gloves',
  openGraph: {
    title: 'AO33 | Pure Goalkeeping',
    description: 'Guantes profesionales diseñados con la experiencia de la Selección Colombia',
    type: 'website',
  },
  icons: {
    icon: '/images/logos/AO logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');

            // Scroll depth tracking
            let scrollMarks = {25: false, 50: false, 75: false, 100: false};
            window.addEventListener('scroll', function() {
              const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
              [25, 50, 75, 100].forEach(mark => {
                if (scrollPercent >= mark && !scrollMarks[mark]) {
                  scrollMarks[mark] = true;
                  gtag('event', 'scroll_depth', { percent: mark });
                }
              });
            });
          `}
        </Script>
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
