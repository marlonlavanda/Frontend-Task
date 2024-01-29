export interface Children {
  children: React.ReactNode
}

export interface Absence {
  id: number
  startDate: Date | string
  days: number
  conflicts?: boolean
  absenceType: string
  employee: Employee
  approved: boolean
}

export interface Employee {
  firstName: string
  lastName: string
  id: string
}

export interface ModalProps {
  absences: Absence[]
  showModal?: boolean
  handleCloseModal?: () => void
}

export interface AllAbsences {
  absences: Absence[]
}

export interface Modal {
  isOpen: boolean
}
