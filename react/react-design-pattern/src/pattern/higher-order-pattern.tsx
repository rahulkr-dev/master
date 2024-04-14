import { useEffect, useState } from "react"

function withAuth(WrappedComponent){
    const [isAuth,setIsAuth] = useState(false);

    useEffect(()=>{
        setIsAuth(true);
    },[])


    return (
        isAuth?WrappedComponent:<div>you are not authenticate</div>
    )
}


function ProtectedRoute(){
    return <div>
        This is protected page
    </div>
}


const AuthProtectedRoute = withAuth(ProtectedRoute)