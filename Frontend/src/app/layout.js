
// ===== APP/LAYOUT.JS =====
'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <AnimatePresence mode="wait">
              <motion.main 
                className="flex-1 container mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
