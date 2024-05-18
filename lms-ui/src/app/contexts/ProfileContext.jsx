import { createContext, useState } from 'react'

export const ProfileContext = createContext({})

const ProfileContextProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        "_id": "",
        "role": "",
        "name": "",
        "userName": "",
        "emailId": "",
        "contactNo": "",
    })
    return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>
}

export default ProfileContextProvider