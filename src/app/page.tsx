'use client'
import {useEffect, useState, useCallback} from 'react'
import {fetchAbsences, fetchConflict} from '../lib/functions'
import List from '@/components/List'
import {Absence} from '@/lib/types'
import {randomInt} from 'crypto'
import Spinning from '@/components/Spining'

export default function Home() {
  const [absences, setAbsences] = useState<Absence[]>([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<number>(1)

  const fetchDataForAllItems = useCallback(async () => {
    try {
      const allAbsences = await fetchAbsences()

      const promises = allAbsences.map(async (absence: Absence) => {
        const conflictData = await fetchConflict(absence.id)
        return {...absence, conflicts: conflictData.conflicts}
      })

      const results = await Promise.all(promises)
      setAbsences(results)
      setLoading(false)
      return results
    } catch (error) {
      console.error('Error fetching data for all absences:', error)
    }
  }, [])

  useEffect(() => {
    fetchDataForAllItems()
  }, [fetchDataForAllItems])

  const sortByName = () => {
    const sortedAbsences = [...absences].sort((a, b) => {
      const nameA = `${a.employee.firstName} ${a.employee.lastName}`
      const nameB = `${b.employee.firstName} ${b.employee.lastName}`
      return nameA.localeCompare(nameB) * order
    })
    setAbsences(sortedAbsences)
    setOrder(order === 1 ? -1 : 1)
  }

  const sortByAbsenceType = () => {
    const sortedAbsences = [...absences].sort(
      (a, b) => a.absenceType.localeCompare(b.absenceType) * order
    )
    setAbsences(sortedAbsences)
    setOrder(order === 1 ? -1 : 1)
  }

  const sortByStartDate = () => {
    const sortedAbsences = [...absences].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime()
      const dateB = new Date(b.startDate).getTime()
      return (dateA - dateB) * order
    })
    setAbsences(sortedAbsences)
    setOrder(order === 1 ? -1 : 1)
  }

  if (loading) return <Spinning />
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="container w-full bg-white p-8 rounded-lg">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Absence List</h2>
          <p className="text-gray-600">
            Toggle List Headers to sort by Employee, Start Dates and Types
          </p>
          <p className="text-sm text-red-700">
            * Absences with conflicts are highlighted in red *
          </p>
        </div>
        <List
          absences={absences}
          sortByName={sortByName}
          sortByAbsenceType={sortByAbsenceType}
          sortByStartDate={sortByStartDate}
        />
      </div>
    </main>
  )
}
