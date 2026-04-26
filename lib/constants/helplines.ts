/**
 * Emergency and health helpline numbers for India.
 * Includes national helplines and state-wise numbers for major states.
 */

import { Helpline } from '@/types'

/** National emergency and health helplines */
export const NATIONAL_HELPLINES: Helpline[] = [
  { name: 'Ambulance', number: '108', scope: 'national' },
  { name: 'Emergency', number: '112', scope: 'national' },
  { name: 'Health Helpline', number: '104', scope: 'national' },
  { name: 'Mental Health (NIMHANS)', number: '080-46110007', scope: 'national' },
  { name: 'iCall Mental Health', number: '9152987821', scope: 'national' },
  { name: 'Women Helpline', number: '1091', scope: 'national' },
  { name: 'Child Helpline', number: '1098', scope: 'national' },
]

/** State-wise helplines for major Indian states */
export const STATE_HELPLINES: Helpline[] = [
  // Maharashtra
  { name: 'Maharashtra COVID Helpline', number: '020-26127394', scope: 'state', state: 'Maharashtra' },
  { name: 'BMC Health Helpline (Mumbai)', number: '1916', scope: 'state', state: 'Maharashtra' },

  // Delhi
  { name: 'Delhi Health Helpline', number: '011-22307145', scope: 'state', state: 'Delhi' },
  { name: 'Delhi COVID Helpline', number: '1031', scope: 'state', state: 'Delhi' },

  // Karnataka
  { name: 'Karnataka Health Helpline', number: '104', scope: 'state', state: 'Karnataka' },
  { name: 'BBMP Helpline (Bengaluru)', number: '080-22221188', scope: 'state', state: 'Karnataka' },

  // Tamil Nadu
  { name: 'Tamil Nadu Health Helpline', number: '044-29510500', scope: 'state', state: 'Tamil Nadu' },
  { name: 'GCC Helpline (Chennai)', number: '1913', scope: 'state', state: 'Tamil Nadu' },

  // West Bengal
  { name: 'West Bengal Health Helpline', number: '1800-313-444-222', scope: 'state', state: 'West Bengal' },
  { name: 'KMC Helpline (Kolkata)', number: '033-22861212', scope: 'state', state: 'West Bengal' },

  // Uttar Pradesh
  { name: 'UP Health Helpline', number: '18001805145', scope: 'state', state: 'Uttar Pradesh' },
  { name: 'UP Emergency Helpline', number: '112', scope: 'state', state: 'Uttar Pradesh' },

  // Gujarat
  { name: 'Gujarat Health Helpline', number: '104', scope: 'state', state: 'Gujarat' },
  { name: 'AMC Helpline (Ahmedabad)', number: '079-25391811', scope: 'state', state: 'Gujarat' },

  // Rajasthan
  { name: 'Rajasthan Health Helpline', number: '0141-2225624', scope: 'state', state: 'Rajasthan' },
  { name: 'Rajasthan Emergency', number: '108', scope: 'state', state: 'Rajasthan' },
]

/** All helplines combined */
export const ALL_HELPLINES: Helpline[] = [...NATIONAL_HELPLINES, ...STATE_HELPLINES]

/**
 * Get helplines relevant to a specific state.
 * Always includes national helplines plus state-specific ones if the state matches.
 * @param state - Optional state name to filter by
 * @returns Array of relevant helplines
 */
export function getHelplinesForState(state?: string): Helpline[] {
  if (!state) return NATIONAL_HELPLINES

  const stateHelplines = STATE_HELPLINES.filter(
    (h) => h.state?.toLowerCase() === state.toLowerCase()
  )

  return [...NATIONAL_HELPLINES, ...stateHelplines]
}
