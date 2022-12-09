import useAuth from "./useAuth";

const useRole = (role) =>{
    const user = useAuth();
    if(user?.role == role){
        return true;
    }
    else{
        return false;
    }
}

export default useRole