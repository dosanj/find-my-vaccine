import React from 'react'
export function CenterAvailabilityMessage({
  pincode,
  centersAvailable,
}: {
  pincode: string
  centersAvailable: boolean
}) {
  if (centersAvailable) {
    return (
      <h3 className="text-xl leading-7 text-gray-500 sm:text-2xl text-wrap m-4 text-center">
        Vaccines available next week in pincode: <span className="text-gray-900">{pincode}</span>{' '}
      </h3>
    )
  }

  return (
    <h3 className="text-xl leading-7 text-gray-500 sm:text-2xl text-wrap m-4 text-center">
      No Vaccines available for pincode: <span className="text-gray-900">{pincode}</span>{' '}
    </h3>
  )
}
