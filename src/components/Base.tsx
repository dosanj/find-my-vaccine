/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { UserInput } from './UserInput'
import { IVaccineCenter } from '../models/vaccine-center.model'
import VaccineCenters from './VaccineCenters'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Base() {
    const [vaccineCenters, setVaccineCenters] = useState([] as IVaccineCenter[]);
    const [pincode, setPincode] = useState('');
    const getCenters = (centers: IVaccineCenter[], pincode: string) => {
        setVaccineCenters(centers);
        setPincode(pincode);
    }
    return (
        <>
            <div className="bg-gray-800 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center">
                        <div className="ml-5 flex items-baseline space-x-4">
                            <a href="#" className="bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                                Find My Vaccine
                                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 m-4">
                <UserInput getCenters={getCenters} />
                <VaccineCenters centers={vaccineCenters} pincode={pincode} />
            </div>
        </>
    )
}
