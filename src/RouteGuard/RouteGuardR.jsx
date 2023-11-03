import { Children, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const RouteGuardR = () => {

    const nav = useNavigate()

    useEffect(()=>{
        if(window.innerWidth < 450){
            return(
                Children
            )
        }
    },[])


  return (
    <div>
      
    </div>
  )
}

export default RouteGuardR
