import Alert from 'react-bootstrap/Alert';

// Alert message that displays when item is added to cart
export const alreadyInCart = () => {
  return (
        <Alert key='warning' variant='warning'>
            Item already in cart!
        </Alert>
  );
}
