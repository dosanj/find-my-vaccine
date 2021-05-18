
import React, { useEffect, useState } from 'react';
import { ISession, IVaccineCenter } from '../models/vaccine-center.model';
import { NoCenterAvailable } from './NoCenterAvailable';

interface ICenterData extends ISession {
  center_name: string;
}
export default function VaccineCenters({ centers, pincode }: { centers: IVaccineCenter[], pincode: string }) {
  const [centerData, setCenterData] = useState([] as ICenterData[])
  useEffect(() => {
    const centerData: ICenterData[] = [];
    centers.map((center: IVaccineCenter) => {
      return center.sessions.map((session: ISession) => {
        if (session.available_capacity) {
          centerData.push({ ...session, center_name: center.name })
        }
      });
    });
    setCenterData(centerData);
  }, [centers]);
  if (!pincode) {
    return <></>;
  }
  if (!centerData.length) {
    return <NoCenterAvailable pincode={pincode} />
  }
  return (
    <div className="flex flex-col mt-8">
      <h3 className="text-xl leading-7 text-gray-500 sm:text-2xl text-wrap mb-4">Vaccines available next week in pincode: <span className="text-gray-900">{pincode}</span> </h3>
      <div className="overflow-x-auto shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center hidden sm:block"
              >
                Vaccine
                    </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center"
              >
                Age Group
                    </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center hidden sm:block"
              >
                Center
                    </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center"
              >
                Date
                    </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-medium text-gray-900 uppercase tracking-wider text-center"
              >
                Capacity Left
                    </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {centers.map((center: IVaccineCenter) => {
              return center.sessions.map((session: ISession) => {
                if (session.available_capacity) {
                  return (
                    <tr key={session.session_id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center hidden sm:table-cell">{session.vaccine}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{session.min_age_limit}+</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center hidden sm:table-cell">{center.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{session.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 ">
                          {session.available_capacity}
                        </span>
                      </td>
                      {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center"><button className="text-blue-800 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button></td> */}
                    </tr>
                  )
                }
              });
            }
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
