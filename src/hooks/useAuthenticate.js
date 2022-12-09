import { AddPlayListModal } from "components";
import { useEffect , useState } from "react";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const { useNavigate } = require("react-router-dom")

const useAuthenticate = () => {
    
  const [modelOpen, setModalOpen] = useState(true);
    const user = useAuth();
    const navigate = useNavigate();


    const checkAuthentication = () => {
        if(user === null) {
           toast.info("Plz Login First")
            
            //navigate('/sign-in')
            return ;
        }
    }


    return checkAuthentication;
    
}

export default useAuthenticate