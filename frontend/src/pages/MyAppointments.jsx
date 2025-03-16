import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium border-b text-zinc-700'>My Appointments</p>
      <div>
        {appointments.slice(0, 2).map((item, index) => (
          <div
            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
            key={index}
          >
            <div>
              <img
                className='w-32 bg-indigo-50'
                src={item?.docData?.image || '/default-image.jpg'}  
              />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='font-semibold text-neutral-800'>
                {item?.docData?.name || 'Unknown Doctor'}
              </p>
              <p>{item?.docData?.speciality || 'N/A'}</p>
              <p className='mt-1 font-medium text-zinc-700'>Address:</p>
              <p className='text-xs'>{item?.docData?.address?.line1 || 'N/A'}</p>
              <p className='text-xs'>{item?.docData?.address?.line2 || 'N/A'}</p>
              <p className='mt-1 text-sm'>
                <span className='text-sm font-medium text-neutral-700'>Date & Time:</span> {item?.slotDate || 'N/A'} | {item?.slotTime || 'N/A'}
              </p>
            </div>

            <div></div>

            <div className='flex flex-col justify-end gap-2'>
              <button className='py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-primary hover:text-white'>
                Pay Online
              </button>
              <button className='py-2 text-sm text-center border rounded text-stone-500 sm:min-w-48 hover:bg-red-600 hover:text-white'>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
