import Alert from 'react-bootstrap/Alert';

// Alert message that displays when item is added to cart
export const orderConfirmedMsg = () => {
  return (
        <Alert key='success' variant={'success'}>
          Order has been placed!
        </Alert>
  );
}
