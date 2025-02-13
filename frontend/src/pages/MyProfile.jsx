import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData ,setUserData] = useState({
    name:"Edward vincent",
    image:assets.profile_pic,
    email:'richardjameswap@gamil.com',
    phone:'+1 123 456 7890',
    address: {
      line1:"57th Cross, Richmond",
      line2:"Circle, Chrurch Road, London"
    },

    gender:"Male",
    dob: '2000-01-20'

  })

  const [isEdit , setIsEdit] = useState(true)

  return (
    <div className='flex flex-col max-w-lg gap-2 text-sm'>
      
      <img className='rounded w-36' src={userData.image} alt="" />

      {
        isEdit
        ? <input className='mt-4 text-3xl font-medium bg-gray-50 max-w-60' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>
        : <p className='mt-4 text-3xl fot-medium text-neutral-800'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>

      <div>
        <p className='mt-3 underline text-neutral-500'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
            ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))}/>
            : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
            ?<p>
              <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev, address,line1: e.target.value}))} value={userData.address.line1} type="text" />
              <br />
              <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev, address,line2: e.target.value}))} value={userData.address.line2} type="text" />
            </p>
            : <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
            </p>
          }

        </div>
      </div>

      <div>
        <p className='mt-3 underline text-neutral-500'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gray-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
            ? <select className='bg-gray-100 max-w-20' onChange={(e) => setUserData(prev => ({...prev , gender: e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>BirthDay:</p>
          {
            isEdit 
            ? <input className='text-gray-400' type="data" onChange={(e) => setUserData(prev => ({...prev , dob:e.target.value}))} value={userData.dob}/>
            : <p>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
          ? <button className='px-8 py-2 transition-all border rounded-full border-primary hover:bg-primary hover:text-white' onClick={()=> setIsEdit(false)}>Save information</button>
          : <button className='px-8 py-2 border rounded-full border-primary hover:bg-primary hover:text-white' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile
