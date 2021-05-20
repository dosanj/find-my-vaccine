import React from 'react'
import { ICenterData } from '../models/vaccine-center.model'

export default function VaccineCenters({ centers, pincode }: { centers: ICenterData[]; pincode: string }) {
  return (
    <div className={`flex flex-col overflow-y-auto transition-all duration-500 ${!!centers.length ? 'flex-1' : 'h-0'}`}>
      {!!centers.length && (
        <table className="min-w-full divide-y  divide-gray-200 overflow-x-auto overflow-y-scroll border-gray-200 rounded-md shadow">
          <thead className="bg-blue-100">
            <tr>
              <th scope="col" className="table-head-text hide-cell-in-mobile">
                Vaccine
              </th>
              <th scope="col" className="table-head-text">
                Center
              </th>
              <th scope="col" className="table-head-text">
                Date
              </th>
              <th scope="col" className="table-head-text">
                Capacity Left
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  divide-gray-200">
            {centers.map((center: ICenterData) => {
              if (center.available_capacity) {
                return (
                  <tr key={center.session_id}>
                    <td className="table-cell-text hide-cell-in-mobile">{center.vaccine}</td>
                    <td className="table-cell-text whitespace-pre-wrap">{center.center_name}</td>
                    <td className="table-cell-text">{center.date}</td>
                    <td className="table-cell-text whitespace-nowrap text-center">
                      <span className="px-2 rounded-full font-semibold bg-blue-100 text-blue-800 ">
                        {center.available_capacity}
                      </span>
                      <span> for {center.min_age_limit}+ </span>
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
