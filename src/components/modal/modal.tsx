import React from 'react';
import styleModal from './modal.module.css'
import ModalOverlay from './modal-overlay';
import ReactDOM from "react-dom"
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const modalRoot = document.getElementById("burger-modals");

const Modal = ({ children, show, handleModalClose,header }) => {
    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            handleModalClose();
        }
    }
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return ()=> window.removeEventListener('keydown', handleKeyDown)
    },[handleKeyDown])
    
    return ReactDOM.createPortal(
        (
            show&&<ModalOverlay handleModalClose={handleModalClose} show={show}>
                <div className={styleModal.modal} >
                <span className={styleModal.header + ' mt-10'} onClick={handleModalClose} >
                                <p className='text text_type_main-large ml-10' >{header}</p>
                                <span className={styleModal.close+' mr-10'}><CloseIcon type="primary" /></span>
                </span>
                        
                    {children}
                </div>
            </ModalOverlay>
        ),
        modalRoot
    )

}

export default Modal