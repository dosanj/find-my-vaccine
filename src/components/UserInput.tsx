import React, { useState } from 'react'
import { ICenterData, ISession, IVaccineCenter } from '../models/vaccine-center.model'
interface IUserInputProps {
  getCenters: (value: ICenterData[], pincode: string) => void
}
export function UserInput({ getCenters }: IUserInputProps) {
  const [pinCode, setPinCode] = useState('')
  const [loader, setLoader] = useState(false)
  const [validInput, setValidInput] = useState(false)
  // const [noOfWeeks, setNumberOfWeeks] = useState('1');
  const todaysDate = () => {
    const date = new Date()
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
  const getSlots = () => {
    setLoader(true)
    fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${todaysDate()}`,
    )
      .then(res => res.json())
      .then(({ centers }) => {
        const centerData: ICenterData[] = []
        centers.forEach((center: IVaccineCenter) => {
          return center.sessions.forEach((session: ISession) => {
            if (session.available_capacity) {
              centerData.push({ ...session, center_name: center.name })
            }
          })
        })
        getCenters(centerData, pinCode)
        setLoader(false)
      })
  }

  const validateAndSetPincode = (code: string) => {
    const regex = new RegExp('^[0-9]{6,6}$')
    setPinCode(code)
    setValidInput(false)
    if (regex.test(code)) {
      setValidInput(true)
    }
  }

  return (
    <div className="mb-4 flex-1 flex flex-col justify-center">
      <>
        <img
          className="mx-auto w-auto h-16"
          src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          alt="Workflow"
        />
        <h2 className="m-4 text-center text-2xl text-gray-900">Find your vaccine slots</h2>
      </>
      <div className="flex flex-row items-end sm:max-w-md mx-auto justify-between p-5 bg-white sm:gap-4 rounded-md">
        <div className="flex flex-col">
          <label htmlFor="pin_code" className="block text-sm font-medium text-gray-700">
            Pin Code
          </label>
          <input
            type="text"
            name="pin_code"
            id="pin_code"
            pattern="[0-9]{6,6}"
            required
            autoComplete="pin_code"
            value={pinCode}
            onChange={({ target }) => validateAndSetPincode(target.value)}
            placeholder="6 digit Pin Code e.g 445205"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
          />
        </div>

        <div className="w-44 sm:w-auto flex  rounded-md shadow-sm ">
          <button
            onClick={getSlots}
            type="button"
            className="inline-flex ml-auto px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 focus:outline-none transition ease-in-out duration-150 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={!validInput}
          >
            {!!loader && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Get Slots
          </button>
        </div>
      </div>
    </div>
  )
}
