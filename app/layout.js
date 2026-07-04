import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Asemakaha Mande — Data Scientist & Software Engineer",
  description:
    "Portfolio of Asemakaha Mande — Data Scientist, Software Engineer, and AI enthusiast based in Abuja, Nigeria. Specialising in Python, Django, React, and Machine Learning.",
  keywords: [
    "Asemakaha Mande",
    "Data Scientist",
    "Software Engineer",
    "AI",
    "Python",
    "Django",
    "React",
    "Abuja",
    "Nigeria",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#03060f] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
