/**
 * Intent classifier for ArogyaBot.
 * Uses fast keyword matching — no API calls.
 * Classification is best-effort and never blocks the main AI response.
 */

import { IntentCategory, ModuleUsed } from '@/types'

/** Keyword patterns for each intent category */
const INTENT_KEYWORDS: Record<Exclude<IntentCategory, 'emergency' | 'general'>, string[]> = {
  symptoms: [
    'fever', 'cough', 'cold', 'pain', 'headache', 'rash', 'vomit', 'vomiting',
    'diarrhea', 'diarrhoea', 'swelling', 'sore throat', 'nausea', 'dizzy',
    'dizziness', 'fatigue', 'tired', 'weakness', 'ache', 'itching', 'burning',
    'bleeding', 'infection', 'inflammation', 'cramp', 'chills', 'sweating',
    'breathless', 'wheezing', 'congestion', 'runny nose', 'sneezing',
    'body ache', 'joint pain', 'stomach', 'chest', 'back pain',
    'बुखार', 'खांसी', 'दर्द', 'सूजन', 'उल्टी', 'दस्त', 'सिरदर्द',
    'காய்ச்சல்', 'இருமல்', 'வலி',
    'জ্বর', 'কাশি', 'ব্যথা',
  ],
  myth: [
    'is it true', 'i heard', 'they say', 'someone told', 'people say',
    'does', 'can', 'myth', 'rumor', 'rumour', 'fake', 'false',
    'cure', 'remedy', 'home remedy', 'herbal', 'ayurvedic cure',
    'miracle', 'guaranteed', 'hoax', 'conspiracy',
    'whatsapp', 'forward', 'viral', 'social media said',
    'क्या यह सच है', 'सुना है', 'लोग कहते', 'इलाज',
  ],
  prevention: [
    'prevent', 'avoid', 'protect', 'safe', 'safety', 'vaccine', 'vaccination',
    'hygiene', 'precaution', 'wash', 'sanitize', 'mask', 'immunity',
    'immune', 'diet', 'nutrition', 'exercise', 'healthy', 'tips',
    'how to stay', 'how to prevent', 'how to avoid', 'protection',
    'रोकथाम', 'बचाव', 'टीका', 'स्वच्छता',
    'தடுப்பூசி', 'பாதுகாப்பு',
    'প্রতিরোধ', 'টিকা',
  ],
  location: [
    'near me', 'nearby', 'hospital', 'clinic', 'doctor', 'where', 'find',
    'nearest', 'close to', 'location', 'pincode', 'pin code', 'city',
    'pharmacy', 'medical store', 'health center', 'health centre',
    'vaccination center', 'vaccination centre', 'government hospital',
    'अस्पताल', 'क्लिनिक', 'डॉक्टर', 'कहां',
    'மருத்துவமனை', 'எங்கே',
    'হাসপাতাল', 'কোথায়',
  ],
}

/**
 * Classify the intent of a user message using keyword matching.
 * This is synchronous and fast — no API calls are made.
 *
 * @param text - The user's message text
 * @returns The classified intent category
 */
export function classifyIntent(text: string): IntentCategory {
  const lowerText = text.toLowerCase()

  // Check each category's keywords
  for (const [category, keywords] of Object.entries(INTENT_KEYWORDS)) {
    const matched = keywords.some((keyword) => lowerText.includes(keyword))
    if (matched) {
      return category as IntentCategory
    }
  }

  return 'general'
}

/**
 * Map an intent category to the AI module that should handle it.
 *
 * @param intent - The classified intent category
 * @returns The module identifier
 */
export function intentToModule(intent: IntentCategory): ModuleUsed {
  switch (intent) {
    case 'emergency':
      return 'EMERGENCY'
    case 'myth':
      return 'PMC'
    case 'location':
      return 'CARE'
    case 'symptoms':
    case 'prevention':
      return 'VIR'
    case 'general':
    default:
      return 'GENERAL'
  }
}
