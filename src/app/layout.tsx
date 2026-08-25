import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const thaiSans = Noto_Sans_Thai({
  variable: "--font-thai-sans",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PPT Consultant Coach",
  description: "ฝึกทำ PowerPoint สไตล์ที่ปรึกษา ด้วย tip ประจำวัน เทมเพลต แบบฝึกหัด และบททดสอบวัดความชำนาญ",
};

const NAV_ITEMS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/tips", label: "Tips" },
  { href: "/templates", label: "Templates" },
  { href: "/practice", label: "ฝึกปฏิบัติ" },
  { href: "/test", label: "บททดสอบ" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${thaiSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-brand tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              PPT Consultant Coach
            </Link>
            <nav className="flex gap-1 sm:gap-1.5 bg-surface rounded-full p-1 shadow-sm">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-muted hover:text-foreground hover:bg-background transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-8">{children}</main>
        <footer className="py-6 text-center text-xs text-muted">
          ฝึกทำ PowerPoint สไตล์ที่ปรึกษา ทีละนิด ทุกวัน
        </footer>
      </body>
    </html>
  );
}
