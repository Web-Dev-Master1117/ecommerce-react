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
      
        if(user && loadingStatus === 'loading'){
          return (<h1>wait..</h1>) 
        }else if(user && loadingStatus === 'idle'){
          return children;
        }else if(!user){
          return <Navigate to="/login" replace={true}></Navigate>;
        }
      
          
           
          
}

export default Protected;