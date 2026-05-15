/**
 * Layout-komponenten är din "mall" för alla sidor.
 * Allt du skriver här (som t.ex. en navigeringsmeny) kommer synas på alla undersidor.
 */
import React, { ReactNode } from "react"

/**
 * TypeScript Interface: Här definierar vi vad Layout-komponenten behöver för att fungera.
 * 'children' är det innehåll som läggs inuti <Layout>...</Layout>.
 */
interface LayoutProps {
  children: ReactNode;
  location?: any; // Platsdata från Gatsby (URL m.m.)
  title?: string; // Sidans titel
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-wrapper">
      {/* <main> taggen omsluter det unika innehållet för varje sida. */}
      <main>{children}</main>
    </div>
  )
}

export default Layout
