import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <div className="relative z-10 flex min-h-svh flex-col bg-background">
        <SiteHeader />
        <main className="relative flex min-h-svh overflow-hidden flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
