import React from 'react';
import styleModal from './modal.module.css'
import ModalOverlay from './modal-overlay';


const Modal = ({ children, show, handleModalClose }) => {
    const handleKeyDown = (event) =>{
        console.log(event)
        console.log(event.key)
        if (event.key === "Escape") {
            console.log(event.key)
            handleModalClose();
       }
    }
    React.useEffect(()=>{
        window.addEventListener('keydown',handleKeyDown)
        return window.removeEventListener('keydown',handleKeyDown)
    },[handleKeyDown])
    return (
        <ModalOverlay show={show} handleModalClose={handleModalClose}>
            <div className={styleModal.modal} >
                 {children}
            </div>
        </ModalOverlay>
    )

}

export default Modal