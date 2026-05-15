# 🚀 Oscar's Portfolio (Gatsby + TypeScript)

Min personliga portfolio byggd med Gatsby och TypeScript, hostad på Netlify.

## 🛠 Snabbstart

För att börja jobba med projektet lokalt:

1. **Gå till projektmappen:**
   ```bash
   cd /home/madlad/projects/portfolio-g
   ```

2. **Starta utvecklingsservern:**
   ```bash
   npm run develop
   ```
   * Sidan körs på: [http://localhost:8000](http://localhost:8000)
   * GraphQL-editor: [http://localhost:8000/___graphql](http://localhost:8000/___graphql)

## 📁 Projektstruktur (Viktiga mappar)

- **`src/pages/`**: Här ligger alla sidor. Ändra `index.tsx` för att redigera startsidan.
- **`src/components/`**: Återanvändbara React-komponenter (Layout, SEO, etc.).
- **`content/blog/`**: Här lägger du till dina projekt och rapporter i **Markdown (.md)**.
- **`src/images/`**: Här lägger du bilder som ska användas på sidan.
- **`gatsby-config.js`**: Här ändrar du sidans titel, beskrivning och metadata.

## 📝 Lägg till nytt innehåll (Projekt/Rapport)

1. Skapa en ny mapp i `content/blog/exempel-projekt/`.
2. Skapa en fil som heter `index.md` i mappen.
3. Lägg till följande högst upp i filen:
   ```markdown
   ---
   title: "Mitt Projekt"
   date: "2024-05-14"
   description: "En kort beskrivning av vad jag gjort."
   ---
   Här börjar din text...
   ```

## ⚙️ Kommandon

- `npm run develop` - Startar lokal server med hot-reload.
- `npm run clean` - Rensar cache (använd om sidan strular).
- `npm run build` - Skapar en färdig produktionsversion i `public/`.
- `npx tsc --noEmit` - Kontrollerar TypeScript-fel.

## 🚀 Deployment
Projektet är förberett för **Netlify**. Vid varje push till huvudbranschen (om kopplat till Git) byggs sidan automatiskt.
