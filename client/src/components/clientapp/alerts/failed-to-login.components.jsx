import Alert from 'react-bootstrap/Alert';

// Alert message that displays when item is added to cart
export const failedToLogin = () => {
  return (
        <Alert key='danger' variant='danger'>
            Please select a user to log in.
        </Alert>
  );
}
