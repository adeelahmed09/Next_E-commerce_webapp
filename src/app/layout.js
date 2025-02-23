
import { SessionProvider } from "next-auth/react";
import Nav from "./components/Nav";
import "./globals.css";
import Providers from "./providers/page";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
