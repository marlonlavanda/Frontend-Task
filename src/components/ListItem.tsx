import {dateTimeFormat, formatAbsenseType} from '../lib/functions'

interface AbsenceProps {
  id: number
  startDate: Date | string
  days: number
  absenceType: string
  conflicts?: boolean
  employee: {
    firstName: string
    lastName: string
    id: string
  }
  approved: boolean
  openModal: () => void
}

export default function ListItem({
  startDate,
  days,
  absenceType,
  conflicts,
  employee,
  approved,
  openModal
}: AbsenceProps) {
  return (
    <li
      className={`grid grid-cols-5  py-2 px-4 rounded-md items-center text-sm ${conflicts ? 'bg-red-200/75 text-red-700' : 'even:bg-gray-100'}`}
    >
      <div>{dateTimeFormat(startDate, days).newStartDate}</div>
      <div>{dateTimeFormat(startDate, days).endDate}</div>
      <div>
        <button onClick={openModal} className="flex gap-2">
          <span>{employee.firstName}</span>
          <span>{employee.lastName}</span>
        </button>
      </div>
      <div>
        <span
          className={`${approved ? 'bg-green-200/75 text-green-700' : 'bg-yellow-200/75 text-yellow-700'} px-2 py-1 text-xs rounded-md inline-block`}
        >
          {approved ? 'Approved' : 'Pending approval'}
        </span>
      </div>
      <div>{formatAbsenseType(absenceType)}</div>
    </li>
  )
}
