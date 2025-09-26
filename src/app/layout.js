import Modal from "@/components/Modal";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/store/Providers";
import AuthInitializer from "@/components/AuthInitializer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Rasen E-commerce",
  description: "E-commerce assignment in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-50">
        <Providers>
          <AuthInitializer>
            <Navbar />
            <main className="container mx-auto p-4">
              {children}
              <Toaster />
            </main>

            <Modal />
          </AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
