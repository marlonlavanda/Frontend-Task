import {Absence} from './types'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function getConflict(absence: Absence) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${apiURL}/conflict/${absence.id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function fetchConflict(absenceId: number) {
  try {
    const response = await fetch(`${apiURL}/conflict/${absenceId}`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error(`Error fetching data for absence ${absenceId}:`, error)
    throw error
  }
}

export async function fetchAbsences() {
  try {
    const response = await fetch(`${apiURL}/absences`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error fetching data for absences', error)
    throw new Error('Failed to fetch data')
  }
}

export function dateTimeFormat(startDate: Date | string, days: number) {
  const language = 'en-GB'
  const newStartDate = new Date(startDate)
  const duration = days

  // Calculate the end date
  const endDate = new Date(startDate)
  endDate.setDate(newStartDate.getDate() + duration)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  const formattedStartDate = Intl.DateTimeFormat(language, options).format(
    newStartDate
  )

  const formattedEndDate = Intl.DateTimeFormat(language, options).format(
    endDate
  )

  return {
    newStartDate: formattedStartDate,
    endDate: formattedEndDate
  }
}

export function formatAbsenseType(type: string) {
  const absenceTypes = {
    ANNUAL_LEAVE: 'Annual Leave',
    SICKNESS: 'Sickness',
    MEDICAL: 'Medical'
  }
  const absense =
    absenceTypes[type as keyof typeof absenceTypes] || 'Annual Leave'
  return absense
}
