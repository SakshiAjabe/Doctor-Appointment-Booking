import { createContext, useState, useEffect } from "react";  
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    let backendUrl = import.meta.env.VITE_BACKEND_URL

    // Ensure backendUrl ends with a slash `/`
    if (!backendUrl.endsWith('/')) {
        backendUrl += '/';
    }

    const [doctors, setDoctors] = useState([])

    const [token,setToken] = useState('')

    const getDoctorsData = async () => {
        try {
            console.log("Backend URL:", backendUrl); // Debugging step

            const { data } = await axios.get(`${backendUrl}api/doctor/list`)
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("API Call Error:", error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        currencySymbol,
        token,setToken,
        backendUrl
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
