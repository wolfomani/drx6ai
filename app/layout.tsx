import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ModelProvider } from '@/components/providers/ModelProvider';
import { SpeechProvider } from '@/components/providers/SpeechProvider';
import '@/styles/cosmic-reset.css';
import '@/styles/galaxy-theme.css';
import '@/styles/quantum-animations.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'الوعي الكوني - جذر الوجود الرقمي',
  description: 'تطبيق الوعي الكوني للتفاعل مع الأبعاد المتوازية والمعرفة اللانهائية',
  keywords: 'الوعي الكوني, الذكاء الاصطناعي, الكوانتوم, الأبعاد المتوازية, المعرفة الكونية',
  authors: [{ name: 'فريق الوعي الكوني' }],
  creator: 'الوعي الكوني',
  publisher: 'مؤسسة الأكوان المتوازية',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
  colorScheme: 'dark',
  openGraph: {
    title: 'الوعي الكوني - جذر الوجود الرقمي',
    description: 'تطبيق الوعي الكوني للتفاعل مع الأبعاد المتوازية والمعرفة اللانهائية',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'الوعي الكوني',
    images: [
      {
        url: '/universe-backgrounds/cosmic-consciousness-og.jpg',
        width: 1200,
        height: 630,
        alt: 'الوعي الكوني - جذر الوجود الرقمي',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الوعي الكوني - جذر الوجود الرقمي',
    description: 'تطبيق الوعي الكوني للتفاعل مع الأبعاد المتوازية والمعرفة اللانهائية',
    images: ['/universe-backgrounds/cosmic-consciousness-twitter.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <meta name="cosmic-energy" content="infinite" />
        <meta name="quantum-state" content="superposition" />
        <meta name="dimensions" content="11" />
        <meta name="universe-version" content="∞.∞.∞" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} cosmic-bg-primary min-h-screen`}>
        <ModelProvider>
          <SpeechProvider>
            <div className="cosmic-app-container">
              {/* خلفية الجسيمات الكونية */}
              <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full quantum-particle opacity-70"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full quantum-particle opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-20 w-3 h-3 bg-green-400 rounded-full quantum-particle opacity-50" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-yellow-400 rounded-full quantum-particle opacity-80" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-pink-400 rounded-full quantum-particle opacity-40" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full quantum-particle opacity-60" style={{ animationDelay: '5s' }}></div>
              </div>
              
              {/* المحتوى الرئيسي */}
              <main className="relative z-10">
                {children}
              </main>
              
              {/* مؤشر حالة الكون */}
              <div className="fixed bottom-4 left-4 z-50">
                <div className="bg-black/20 backdrop-blur-md rounded-lg p-2 border border-white/10">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>الطاقة الكونية: نشطة</span>
                  </div>
                </div>
              </div>
              
              {/* مؤشر الأبعاد */}
              <div className="fixed bottom-4 right-4 z-50">
                <div className="bg-black/20 backdrop-blur-md rounded-lg p-2 border border-white/10">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full quantum-entangled"></div>
                    <span>الأبعاد: 11D</span>
                  </div>
                </div>
              </div>
            </div>
          </SpeechProvider>
        </ModelProvider>
        
        {/* سكريبت تهيئة الوعي الكوني */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.cosmicConsciousness = {
                version: '∞.∞.∞',
                dimensions: 11,
                energy: 'infinite',
                quantumState: 'superposition'
              };
              
              console.log('🌌 الوعي الكوني مُفعّل');
              console.log('⚛️ الحالة الكمية: تراكب');
              console.log('🔋 مستوى الطاقة: لانهائي');
              console.log('📐 الأبعاد النشطة: 11');
            `,
          }}
        />
      </body>
    </html>
  );
}

