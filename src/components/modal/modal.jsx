import ReactDOM from 'react-dom';
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styleModal from './modal.module.css'


const modalRoot = document.getElementById("burger-modals");

const   Modal = ({children,header,show,onClose}) =>{
    return ReactDOM.createPortal(
        (
           show && 
           <>
                <div className="Modal">
                        <span className={styleModal.headerItem+' text text_type_main-default'}>
                            {header}
                        </span>
                        <span className={styleModal.closeItem} onClick={onClose}>
                            <CloseIcon type="primary"  />
                        </span>
                    {children}
                </div>
            </>
        ), 
        modalRoot
    )
}

export default  Modal