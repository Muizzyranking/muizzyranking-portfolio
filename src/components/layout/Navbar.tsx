"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY < 20) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 8) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY - 8) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            borderBottom: scrolled
              ? "1px solid var(--color-border-subtle)"
              : "1px solid transparent",
            backgroundColor: scrolled
              ? "color-mix(in srgb, var(--color-background) 85%, transparent)"
              : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          <nav className="container-main">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBlock: "1.25rem",
              }}
            >
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--color-text-primary)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
              >
                muizzyranking
                <span style={{ color: "var(--color-accent)" }}>.</span>
              </Link>

              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2.5rem",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          position: "relative",
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          letterSpacing: "0.01em",
                          color: isActive
                            ? "var(--color-text-primary)"
                            : "var(--color-text-muted)",
                          transition: "color 0.2s ease",
                          paddingBottom: "2px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color =
                            "var(--color-text-primary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = isActive
                            ? "var(--color-text-primary)"
                            : "var(--color-text-muted)")
                        }
                      >
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            style={{
                              position: "absolute",
                              bottom: -2,
                              left: 0,
                              right: 0,
                              height: "1px",
                              backgroundColor: "var(--color-accent)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
