import { useState } from "react";

const useAuth = () => {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    return user;
}

export default useAuth