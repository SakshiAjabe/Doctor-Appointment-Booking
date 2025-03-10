import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    
    <div>
      <div className='pt-10 text-2xl text-center text-gray-500 '>
        <p>ABOUT <span className='font-medium text-gray-700'>US</span></p>
      </div>

      <div className='flex flex-col gap-12 my-10 md:flex-row'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-2/4'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs Conveniently And Efficiently.
            At Precripto , We Understand The Challenges Individuals Face When It Cames To Scheduling Doctors Appointments And Managing Their Health Records
          </p>
          <p>Prescriptois Committed To Excellience In Healthcare Technology . We Continuously Strive To Enhance Our platform , INtegrating The Latest Advantacements To Improve user Experience And Deliver Superior Service.
            Whether You're Booking Your First Appointment Or Managing Ongoing Care. Prescripto Is HEre To support You Every Step Of the Way
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our Vision At Prescripto Is To Create A Seamless Healthcare xperience for Every User . We Aim To To Bridge The Gap 
            Betwwen Patients And Healthcare Providers , Making It Easier For You To Accesss The Care You Need , When You Need it
          </p>
        </div>
      </div>

      <div className='my-4 text-xl'>
        <p>WHY <span className='font-semibold text-gray-700'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col mb-20 md:flex-row'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Effeciency:</b>
          <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access To A Network Of Trusted Healthcare Professionals in Your Area</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health</p>
        </div>
      </div>
    </div>
  )
}

export default About
