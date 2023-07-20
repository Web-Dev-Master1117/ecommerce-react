import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, selectLoggedstatus } from "../authSlice";

function Protected({children}){
    const user = useSelector(selectLoggedInUser);
    const loadingStatus = useSelector(selectLoggedstatus)

        //   if(user && user.status === 'loading'){
        //     return 'wow';
        //   }else if(user && user.status = 'completed'){
        //     return <Navigate to="/login" replace={true}></Navigate>;
        //   }
      
        if(user && loadingStatus === 'idle'){
          return  children; 
        }else if(!user && loadingStatus === 'idle'){
          return <Navigate to="/login" replace={true}></Navigate>;
        }
      
          
           
          
}

export default Protected;