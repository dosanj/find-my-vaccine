/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react'
import { ICenterData } from '../models/vaccine-center.model'
import { Navbar } from './Navbar'
import { NoCenterAvailable } from './NoCenterAvailable'
import { UserInput } from './UserInput'
import VaccineCenters from './VaccineCenters'
export default function Container() {
  const [vaccineCenters, setVaccineCenters] = useState([] as ICenterData[])
  const [loadedPincode, setLoadedPincode] = useState('')
  const [inputPincode, setInputPincode] = useState('')
  const getCenters = (centers: ICenterData[], inputPincode: string) => {
    setVaccineCenters(centers)
    setInputPincode(inputPincode)
    setLoadedPincode(inputPincode)
  }
  return (
    <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div
        className={`flex flex-col flex-1 overflow-hidden m-4 ${!loadedPincode ? `justify-center` : 'justify-start'} `}
      >
        <div className="h-32">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
            alt="Workflow"
          />
          <h2 className="m-6 text-center text-2xl text-gray-900">Find your vaccine slots</h2>
        </div>
        <UserInput getCenters={getCenters} />
        {!vaccineCenters.length && loadedPincode && <NoCenterAvailable pincode={inputPincode} />}
        {loadedPincode && <VaccineCenters centers={vaccineCenters} pincode={inputPincode} />}
      </div>
    </div>
  )
}
