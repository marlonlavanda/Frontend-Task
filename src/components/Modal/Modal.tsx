'use client'

import {ModalProps, Absence} from '@/lib/types'
import {dateTimeFormat, formatAbsenseType} from '../../lib/functions'

export function Modal({absences, showModal, handleCloseModal}: ModalProps) {
  const employeeName =
    absences[0]?.employee?.firstName + ' ' + absences[0]?.employee?.lastName ||
    ''

  if (!showModal) return null

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-3/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div
          className={`translate duration-300 h-full ${
            showModal
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          } `}
        >
          <div className="bg-white p-8 rounded-lg">
            <header className="relative flex justify-between border-b-[1px] pb-2">
              <h4 className="font-bold">{employeeName}</h4>

              <button
                id="close-modal-button"
                data-testid="close-modal-button"
                className="w-[32px] h-[32px] flex justify-center items-center bg-slate-100 hover:bg-slate-200 rounded-full text-sm"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: 'block',
                    fill: 'none',
                    height: '16px',
                    width: '16px',
                    stroke: 'gray',
                    strokeWidth: '4',
                    overflow: 'visible'
                  }}
                >
                  <path d="m6 6 20 20M26 6 6 26"></path>
                </svg>
              </button>
            </header>
            <main className="mt-4">
              <ul className="w-full">
                <li className="grid grid-cols-5 even:bg-gray-100 pb-2 px-4 rounded-md items-center text-sm font-bold">
                  <div>Start Date</div>
                  <div>End Date</div>
                  <div>Employee</div>
                  <div>Status</div>
                  <div>Type</div>
                </li>
                {absences &&
                  absences?.map((absence: Absence) => {
                    return (
                      <li
                        key={absence.id}
                        className={`grid grid-cols-5 py-2 px-4 rounded-md items-center text-sm ${absence.conflicts ? 'bg-red-200/75 text-red-700' : 'even:bg-gray-100'}`}
                      >
                        <div>
                          {
                            dateTimeFormat(absence.startDate, absence.days)
                              .newStartDate
                          }
                        </div>
                        <div>
                          {
                            dateTimeFormat(absence.startDate, absence.days)
                              .endDate
                          }
                        </div>
                        <div className="flex gap-2">
                          <span>{absence.employee.firstName}</span>
                          <span>{absence.employee.lastName}</span>
                        </div>
                        <div>
                          <span>
                            {absence.approved ? 'Approved' : 'Pending approval'}
                          </span>
                        </div>
                        <div>{formatAbsenseType(absence.absenceType)}</div>
                      </li>
                    )
                  })}
              </ul>
            </main>
            <footer></footer>
          </div>
        </div>
      </div>
    </div>
  )
}
