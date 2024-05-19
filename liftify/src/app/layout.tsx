import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import Navbar from '../components/Navbar';

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Liftify",
  description: "Track your workouts and progress easily",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Navbar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
