import ContextProvider from "@/context/ContextProvider";
import "./globals.css";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body className="bg-gray-900 text-white h-screen p-2 relative">
      <ContextProvider>
        {children}
        </ContextProvider>
        </body>
    </html>
  );
}
