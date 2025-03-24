import { createContext } from "react";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const BackedUrl = import.meta.env.VITE_BACKEND_URL

    const value = {

    }
    return (
        
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>

    )
}
export default DoctorContextProvider