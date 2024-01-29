import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'

import '@testing-library/jest-dom'
import {Modal} from './Modal'
import {Absence} from '@/lib/types'

const absences: Absence[] = [
  {
    id: 0,
    startDate: '2022-05-28T04:39:06.470Z',
    days: 9,
    absenceType: 'SICKNESS',
    employee: {
      firstName: 'Rahaf',
      lastName: 'Deckard',
      id: '2ea05a52-4e31-450d-bbc4-5a6c73167d17'
    },
    approved: true
  }
]

describe('EmployeeModal', () => {
  test('renders Modal', () => {
    render(<Modal absences={absences} />)
  })

  test('closes modal', () => {
    const handleCloseModal = jest.fn()
    render(
      <Modal
        absences={absences}
        showModal={true}
        handleCloseModal={handleCloseModal}
      />
    )
    fireEvent.click(screen.getByTestId('close-modal-button'))
    expect(handleCloseModal).toHaveBeenCalled()
  })
})
