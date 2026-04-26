/**
 * Emergency keyword detector for ArogyaBot.
 * SYNCHRONOUS — never async, never an API call.
 * Must complete in < 1ms. This is a critical safety module.
 */

/** Emergency keywords in English — life-threatening situations */
const EMERGENCY_KEYWORDS_EN: string[] = [
  'chest pain',
  'heart attack',
  "can't breathe",
  'cannot breathe',
  'cant breathe',
  'not breathing',
  'difficulty breathing',
  'trouble breathing',
  'stroke',
  'unconscious',
  'fainted',
  'collapsed',
  'severe bleeding',
  'bleeding badly',
  'heavy bleeding',
  'suicidal',
  'want to die',
  'kill myself',
  'end my life',
  'wanting to die',
  'suicide',
  'seizure',
  'seizures',
  'convulsions',
  'convulsing',
  'overdose',
  'poisoned',
  'poisoning',
  'choking',
  'anaphylaxis',
  'allergic shock',
  'severe burn',
  'electrocuted',
  'drowning',
  'drowned',
  'head injury',
  'skull fracture',
  'spinal injury',
  'stabbed',
  'gunshot',
  'snake bite',
  'snakebite',
]

/** Emergency keywords in Hindi */
const EMERGENCY_KEYWORDS_HI: string[] = [
  'सीने में दर्द',
  'दिल का दौरा',
  'सांस नहीं',
  'सांस लेने में',
  'बेहोश',
  'खून बह रहा',
  'बहुत खून',
  'मरना चाहता',
  'मरना चाहती',
  'आत्महत्या',
  'जहर',
  'दौरा पड़',
  'मिर्गी',
  'गिर गया',
  'गिर गयी',
  'साँप ने काटा',
  'जल गया',
  'जल गयी',
]

/** Emergency keywords in Tamil */
const EMERGENCY_KEYWORDS_TA: string[] = [
  'நெஞ்சு வலி',
  'மாரடைப்பு',
  'மூச்சு',
  'சுயநினைவு',
  'இரத்தம்',
  'தற்கொலை',
  'விஷம்',
]

/** Emergency keywords in Bengali */
const EMERGENCY_KEYWORDS_BN: string[] = [
  'বুকে ব্যথা',
  'হার্ট অ্যাটাক',
  'শ্বাস',
  'অজ্ঞান',
  'রক্ত',
  'আত্মহত্যা',
  'বিষ',
]

/** Emergency keywords in Marathi */
const EMERGENCY_KEYWORDS_MR: string[] = [
  'छातीत दुखणे',
  'हृदयविकार',
  'श्वास',
  'बेशुद्ध',
  'रक्त',
  'आत्महत्या',
  'विष',
]

/** All emergency keywords combined from all supported languages */
const ALL_EMERGENCY_KEYWORDS: string[] = [
  ...EMERGENCY_KEYWORDS_EN,
  ...EMERGENCY_KEYWORDS_HI,
  ...EMERGENCY_KEYWORDS_TA,
  ...EMERGENCY_KEYWORDS_BN,
  ...EMERGENCY_KEYWORDS_MR,
]

/**
 * Check if a text message contains emergency keywords.
 * This is a SYNCHRONOUS function — no API calls, no async operations.
 * It must be called before any AI processing to ensure immediate emergency response.
 *
 * @param text - The user's message text
 * @returns true if the message contains emergency keywords
 */
export function isEmergency(text: string): boolean {
  const lowerText = text.toLowerCase()
  return ALL_EMERGENCY_KEYWORDS.some((keyword) => lowerText.includes(keyword))
}

/**
 * The standard emergency response message.
 * Returned immediately without calling the AI when an emergency is detected.
 */
export const EMERGENCY_RESPONSE = `🚨 **This sounds like a medical emergency.**

**Please call immediately:**
- 🚑 **Ambulance: 108**
- 🆘 **Emergency: 112**
- 🏥 **Health Helpline: 104**

**Go to your nearest hospital RIGHT NOW.**

Do not wait. Your safety is what matters most.

If you or someone near you is having thoughts of self-harm, please call:
- 📞 **NIMHANS: 080-46110007**
- 📞 **iCall: 9152987821**

You are not alone. Help is available 24/7.`
