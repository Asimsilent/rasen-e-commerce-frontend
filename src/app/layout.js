import Modal from "@/components/Modal";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/store/Providers";
import AuthInitializer from "@/components/AuthInitializer";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "Simple E-commerce",
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
              {/* <ToastProvider /> */}
            </main>

            <Modal />
          </AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
