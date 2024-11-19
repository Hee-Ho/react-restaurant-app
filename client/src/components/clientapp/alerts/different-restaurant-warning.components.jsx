import Alert from 'react-bootstrap/Alert';

// Alert message that displays when item is added to cart
export const DifferentRestaurant = () => {
  return (
        <Alert key='warning' variant='warning'>
            <h6>Cannot order from more than one restaurant!</h6> Please checkout current items or empty the cart before adding items from a different restaurant!
        </Alert>
  );
}
