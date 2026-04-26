/**
 * Trusted health information sources referenced by ArogyaBot.
 * These are the ONLY sources the AI should cite for health facts.
 */

/** A trusted health information source */
export interface TrustedSource {
  id: string
  name: string
  shortName: string
  url: string
  description: string
}

/** Official trusted sources for health information */
export const TRUSTED_SOURCES: TrustedSource[] = [
  {
    id: 'who',
    name: 'World Health Organization',
    shortName: 'WHO',
    url: 'https://www.who.int',
    description: 'United Nations agency for international public health',
  },
  {
    id: 'cdc',
    name: 'Centers for Disease Control and Prevention',
    shortName: 'CDC',
    url: 'https://www.cdc.gov',
    description: 'US federal agency for public health and disease prevention',
  },
  {
    id: 'mohfw',
    name: 'Ministry of Health and Family Welfare, India',
    shortName: 'MoHFW',
    url: 'https://www.mohfw.gov.in',
    description: 'Indian government ministry responsible for health policy',
  },
  {
    id: 'icmr',
    name: 'Indian Council of Medical Research',
    shortName: 'ICMR',
    url: 'https://www.icmr.gov.in',
    description: 'Apex body in India for biomedical research',
  },
  {
    id: 'nimhans',
    name: 'National Institute of Mental Health and Neuro-Sciences',
    shortName: 'NIMHANS',
    url: 'https://nimhans.ac.in',
    description: 'Premier mental health institution in India',
  },
]

/**
 * Get the display label for a source badge (e.g. "Source: WHO").
 * @param verifiedBy - The shortName of the verifying organization
 * @returns Formatted source label string
 */
export function getSourceLabel(verifiedBy: string): string {
  const source = TRUSTED_SOURCES.find(
    (s) => s.shortName.toLowerCase() === verifiedBy.toLowerCase()
  )
  return source ? `Source: ${source.shortName}` : `Source: ${verifiedBy}`
}

/**
 * Get the URL for a trusted source by its short name.
 * @param shortName - The short name (e.g. 'WHO', 'CDC')
 * @returns The source URL or undefined
 */
export function getSourceUrl(shortName: string): string | undefined {
  return TRUSTED_SOURCES.find(
    (s) => s.shortName.toLowerCase() === shortName.toLowerCase()
  )?.url
}
