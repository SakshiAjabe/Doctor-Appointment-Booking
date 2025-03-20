import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const navigate = useNavigate();

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // const initPay = (order) =>{

  //   const options ={
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: 'Appointment Payment',
  //     description: 'Appointment Payment',
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) =>{
  //       console.log(response)

  //       try{

  //         const {data} = await axios.post(backendUrl+'api/user/verifyRazorpay', response,{headers:{token}})
  //         if(data.success){
  //           getUserAppointments()
  //           navigate('/my-appointments')
  //         }
  //       }
  //       catch(error){
  //         console.log(error);
  //         toast.error(error.message);
  //       }
  //     }
  //   }

  //   const rzp = new window.Razorpay(options)
  //   rzp.open()
  // }
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order?.amount || 0, // Ensure value exists
      currency: order?.currency || "INR",
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order?.id,
      receipt: order?.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error("Payment verification failed. Please try again.");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium border-b text-zinc-700">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item?.docData?.image || "/default-image.jpg"}
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="font-semibold text-neutral-800">
                {item?.docData?.name || "Unknown Doctor"}
              </p>
              <p>{item?.docData?.speciality || "N/A"}</p>
              <p className="mt-1 font-medium text-zinc-700">Address:</p>
              <p className="text-xs">
                {item?.docData?.address?.line1 || "N/A"}
              </p>
              <p className="text-xs">
                {item?.docData?.address?.line2 || "N/A"}
              </p>
              <p className="mt-1 text-sm">
                <span className="text-sm font-medium text-neutral-700">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate) || "N/A"} |{" "}
                {item?.slotTime || "N/A"}
              </p>
            </div>

            <div className="flex flex-col justify-end gap-2">
              {!item.cancelled && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-primary hover:text-white"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="py-2 text-sm text-center border rounded text-stone-500 sm:min-w-48 hover:bg-red-600 hover:text-white"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className="py-2 text-red-500 border border-red-500 rounded sm:min-w-48">
                  Appointment cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
