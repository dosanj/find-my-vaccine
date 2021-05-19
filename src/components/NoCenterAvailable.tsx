import React from 'react';
export function NoCenterAvailable({ pincode }: { pincode: string }) {
    return (
        <div className="flex flex-col mt-8 mx-auto text-center">
            <h3 className="text-lg leading-7 text-gray-500 sm:text-2xl sm:truncate mb-4">No Vaccines available for pincode: <span className="text-gray-900">{pincode}</span> </h3>
        </div>
    )
}