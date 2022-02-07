# E-Commerce site made with React.js

## Kurt Reynolds

### Notable Dependencies

- material-ui: for the interface
- stripe: for card transactions
- commerce.js: API for products database

### Fake credit card to use for checkout

Number: 4242 4242 4242 4242
Exp: 04/24
CVC: 242
Zip: 42424

## Note:
- There is a bug that appears after entering payment information. Initially a message is rendered thanking the user for their purchase. Then an error message will appear stating the given data was invalid. The console log of the error is "Failed to load resource: the server responded with a status of 422 (). 
{"status_code":422,"error":{"message":"The given data was invalid.","type":"unprocessable_entity","errors":{"payment.gateway":["The specified payment gateway is not available. Ensure it is configured, and you are using the appropriate API keys (e.g. sandbox or live)."