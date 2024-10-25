import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styleModal from './modal.module.css'


const modalRoot = document.getElementById("burger-modals");

const Modal = ({children,header,onClose}) =>{
    return ReactDOM.createPortal(
        (
            <>
                <div className="Modal">
                    <ModalHeader onClose={onClose}>
                        <span className={styleModal.headerItem+' text text_type_main-default'}>
                            {header}
                        </span>
                        <span className={styleModal.closeItem}>
                            <CloseIcon type="primary" />
                        </span>
                    </ModalHeader>
                    {children}
                </div>
                <ModalBackDrop onClose={onClose} />
            </>
        ), 
        modalRoot
    )
}