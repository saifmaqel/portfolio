import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="bg-primary text-background rounded-md px-2 py-1">
            SA
          </span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/projects"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/posts"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              posts
            </Link>
            {/* <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Contact
            </Link> */}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
