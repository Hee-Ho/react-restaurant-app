import Alert from 'react-bootstrap/Alert';

// Alert message that displays when item is added to cart
export const addedToCartMsg = (item) => {
  return (
        <Alert key='success' variant={'success'}>
          Added {item.name} to cart!
        </Alert>
  );
}
