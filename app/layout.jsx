import "./globals.css";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Chatbot from "../components/Chatbot";
import { themeScript } from "../lib/sky";
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--serif" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--mono" });

export const metadata = {
  title: "Rafli",
  description: "Rafli's portfolio: AI/ML, and web development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} data-theme="night" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}<Chatbot /> </body>
    </html>
  );
}
