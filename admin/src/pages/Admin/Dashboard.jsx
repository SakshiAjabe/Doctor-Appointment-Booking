import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

    const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer item-center min-w-52 hover:scale-105">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer item-center min-w-52 hover:scale-105">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex gap-2 p-4 transition-all bg-white border-2 border-gray-100 rounded cursor-pointer item-center min-w-52 hover:scale-105">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100">
                <img
                  src={item.docData.image}
                  alt="Doctor"
                  className="w-10 rounded-full"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-gray-600 ">{slotDateFormat(item.slotDate)}</p>
                </div>
                <div>
                  {item.cancelled ? (
                    <p className="text-xs font-medium text-red-400">
                      Cancelled
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-6 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
