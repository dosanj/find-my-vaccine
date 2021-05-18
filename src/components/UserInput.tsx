import React, { useState } from 'react';
import { IVaccineCenter } from '../models/vaccine-center.model';
interface IUserInputProps {
    getCenters: (value: IVaccineCenter[], pincode: string) => void;
}
export function UserInput({ getCenters }: IUserInputProps) {
    const [pinCode, setPinCode] = useState('');
    const [loader, setLoader] = useState(false);
    // const [noOfWeeks, setNumberOfWeeks] = useState('1');
    const todaysDate = () => {
        const date = new Date();
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    const getSlots = () => {
        setLoader(true);
        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${todaysDate()}`).then(res => res.json()).then(({ centers }) => {
            getCenters(centers, pinCode);
            setLoader(false);

        })
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="flex flex-col sm:flex-row items-end w-auto justify-items-center gap-4">
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
                                    onChange={({ target }) => setPinCode(target.value)}
                                    placeholder="6 digit Pin Code e.g 445205"
                                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            {/* <div className="w-full sm:w-32">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Find slot in next
                      </label>
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country"
                                    defaultValue="1"
                                    onChange={({ target }) => setNumberOfWeeks(target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="1">1 week</option>
                                    <option value="2">2 week</option>
                                    <option value="3">4 week</option>
                                </select>
                            </div> */}
                            <div className="w-full sm:w-auto">
                                {/* <button
                                    type="submit"
                                    onClick={getSlots}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Get Slots
                      </button> */}
                                <span className="inline-flex rounded-md shadow-sm">
                                    <button onClick={getSlots} type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 focus:outline-none transition ease-in-out duration-150">
                                        {loader && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>}
        Get Slots
      </button>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}