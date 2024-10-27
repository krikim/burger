import React from "react"
import ReactDOM from "react-dom"
import styleMO from "./modal-overlay.module.css"


const modalRoot = document.getElementById("burger-modals");
const getRandomKey = () => 'mid'+Math.floor(Math.random()*1000000)

const ModalOverlay = ({children,handleModalClose,show,key}) => {
   
    function handleKeyDown(event){
        //console.log(event)
        //console.log(event.key)
        if (event.key === "Escape") {
            //console.log(event.key)
            handleModalClose();
       }
    }
    window.addEventListener("keydown",handleKeyDown)
    /*React.useEffect(()=>{
        window.addEventListener("keydown",handleKeyDown)
    
        return window.removeEventListener("keydown",handleKeyDown)
    },[handleKeyDown])*/

    return ReactDOM.createPortal(
        (
           show&&<div key={getRandomKey()} className={styleMO.overlay} onClick={handleModalClose}>
                {children}
            </div>
        )
        , 
        modalRoot
    )
}

export default ModalOverlay