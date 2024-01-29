'use client'

import {useState, useEffect} from 'react'
import {Absence} from '../lib/types'
import {Modal} from '@/components/Modal/Modal'
import ListItem from './ListItem'
import useModal from '@/hooks/useModal'

interface ListProps {
  absences: Absence[]
  sortByName?: () => void
  sortByAbsenceType?: () => void
  sortByStartDate?: () => void
}
export default function List({
  absences,
  sortByName,
  sortByAbsenceType,
  sortByStartDate
}: ListProps) {
  const modal = useModal()

  const [employeeAbsences, setEmployee] = useState<Absence[]>([])
  const [showModal, setShowModal] = useState(modal.isOpen)

  // If the function is expected to take a number argument

  // If the function is expected to take a number argument
  const handleOpenModal = (id: string) => {
    modal.onOpen()
    const employee = absences.find(({employee}) => employee.id === id)

    const filteredEmployeeAbsences = absences.filter(
      (absence) => absence.employee.id === employee?.employee.id ?? ''
    )
    setEmployee(filteredEmployeeAbsences)
  }
  const handleCloseModal = () => {
    modal.onClose()
  }

  useEffect(() => {
    setShowModal(modal.isOpen)
  }, [modal.isOpen])

  return (
    <>
      <ul className="w-full">
        <li className="grid grid-cols-5 even:bg-gray-100 pb-2 px-4 rounded-md items-center text-sm font-bold">
          <div
            className="hover:cursor-pointer relative after:content-['^'] after:ml-2"
            onClick={sortByStartDate}
          >
            Start Date
          </div>
          <div>End Date</div>
          <div className="hover:cursor-pointer" onClick={sortByName}>
            Employee
          </div>
          <div>Status</div>
          <div className="hover:cursor-pointer" onClick={sortByAbsenceType}>
            Type
          </div>
        </li>
        {absences &&
          absences?.map((absence: Absence) => {
            return (
              <ListItem
                key={absence.id}
                id={absence.id}
                employee={absence.employee}
                startDate={absence.startDate}
                days={absence.days}
                absenceType={absence.absenceType}
                approved={absence.approved}
                openModal={() => handleOpenModal(absence.employee.id)}
                conflicts={absence.conflicts}
              />
            )
          })}
      </ul>
      <Modal
        absences={employeeAbsences}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  )
}
