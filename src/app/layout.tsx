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
  description: "ฝึกทำ PowerPoint สไตล์ที่ปรึกษา ด้วย tip ประจำวัน เทมเพลต และระบบทบทวนแบบเว้นระยะ",
};

const NAV_ITEMS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/tips", label: "Tips" },
  { href: "/templates", label: "Templates" },
  { href: "/review", label: "ทบทวน" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${thaiSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-border bg-surface sticky top-0 z-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between h-14">
            <Link href="/" className="font-semibold text-brand tracking-tight">
              PPT Consultant Coach
            </Link>
            <nav className="flex gap-1 sm:gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm text-muted hover:text-foreground hover:bg-background transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-8">{children}</main>
        <footer className="border-t border-border py-6 text-center text-xs text-muted">
          ฝึกทำ PowerPoint สไตล์ที่ปรึกษา ทีละนิด ทุกวัน
        </footer>
      </body>
    </html>
  );
}
