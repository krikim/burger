import React from "react"
import styleMO from "./modal-overlay.module.css"


const getRandomKey = () => 'mid'+Math.floor(Math.random()*1000000)

const ModalOverlay = ({children,handleModalClose}) => (
           <div key={getRandomKey()} className={styleMO.overlay} onClick={handleModalClose}>
                {children}
            </div>
        )

export default ModalOverlay