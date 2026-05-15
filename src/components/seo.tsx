/**
 * SEO-komponenten sköter allt som sökmotorer (Google) och sociala medier ser.
 * Den sätter titlar och beskrivningar i HTML-huvudet (<head>).
 */
import React from "react"
import { Helmet } from "react-helmet"

/**
 * Interface för SEO-props.
 * 'title' är obligatorisk, medan 'description' är valfri (markerat med ?).
 */
interface SEOProps {
  title: string;
  description?: string;
}

const SEO = ({ title, description = "" }: SEOProps) => {
  return (
    <Helmet>
      {/* Titeln som visas i webbläsarfliken */}
      <title>{title} | Oscar Enghag</title>
      {/* Meta-beskrivningen som visas i Googles sökresultat */}
      <meta name="description" content={description} />
      {/* Vi sätter språket till svenska för bättre tillgänglighet */}
      <html lang="sv" />
    </Helmet>
  )
}

export default SEO
