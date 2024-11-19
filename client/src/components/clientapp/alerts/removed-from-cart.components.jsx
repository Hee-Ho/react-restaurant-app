import Alert from 'react-bootstrap/Alert';
import './removed-from-cart.styles.css'

// Alert message that displays when item is removed from cart
export const removedFromCartMsg = (item) => {
  return (

        <Alert className='center' key='success' variant={'success'}>
          Removed {item.name} from cart
        </Alert>
  );
}
