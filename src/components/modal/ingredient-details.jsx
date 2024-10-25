import Modal from '../modal/modal.jsx'

const OrderDetails = ({OrderItems,openForm}) => {
       
    const [visible,setState] = React.useState(false)
      
    
    const  handleCloseModal = () => {
      setState({ visible: false })
    }
  
  
      return (
        openForm&&
        <Modal 
                header="" 
                onClose={handleCloseModal}
        > 
        <p className="text text_type_digits-large">034536</p>
        <p className="text text_type_main-medium">Идетификатор заказа</p>
        
        </Modal>
  
          );
    
  }