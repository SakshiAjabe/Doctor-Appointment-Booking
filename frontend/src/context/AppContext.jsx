import { createContext, useState, useEffect } from "react";  
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    let backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, '');
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);

    const getDoctorsData = async () => {
        try {
            if (!token) return; 
           // console.log("Backend URL:", backendUrl); 
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("API Call Error:", error);
            toast.error(error.message);
        }
    };

    // Persist token in localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    // Fetch doctors only when token exists
    useEffect(() => {
        getDoctorsData();
    }, [token]);

    const value = { doctors, currencySymbol, token, setToken, backendUrl };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
