/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react'
import { ICenterData } from '../models/vaccine-center.model'
import { Navbar } from './Navbar'
import { CenterAvailabilityMessage } from './CenterAvailabilityMessage'
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
      <div className={`flex flex-col flex-1 overflow-hidden m-4 justify-center`}>
        <UserInput getCenters={getCenters} />
        {loadedPincode && (
          <CenterAvailabilityMessage pincode={inputPincode} centersAvailable={!!vaccineCenters.length} />
        )}
        {<VaccineCenters centers={vaccineCenters} pincode={inputPincode} />}
      </div>
    </div>
  )
}
