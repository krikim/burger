import Modal from './modal.jsx'

const OrderDetails = ({OrderItems}) => {
       
    const [visible,setState] = React.useState(false)
      
    
    const handleOpenModal = () => {
      setState({ visible: true })
    }
  
    const  handleCloseModal = () => {
      setState({ visible: false })
    }
  
  
      return (
        <Modal 
                header="Состав заказа" 
                onClose={handleCloseModal}
        > 
        <p className="text text_type_digits-large">034536</p>
        <p className="text text_type_main-medium">Идетификатор заказа</p>
        <img src='../../assets/order-detail.svg' />
        <p>Ваш заказ начали готовить</p>
        <p>Дождитесь готовности на орбитальной станции</p>
        </Modal>
  
          );
    
  }