import { createContext } from "react";

export const DoctorContext = createContext()

const AppContextProvider = (props) => {
    const value = {

    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider