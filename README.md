### Pulsejs

Pulsejs is a minimal Node.js web framework built without any third-party dependencies, designed for educational purposes.

## Features

- Minimalistic design
- No third-party dependencies
- Educational and easy to understand

## Installation

To install Pulsejs, clone the repository:

```bash
git clone https://github.com/hal-29/pulsejs.git
cd pulsejs
```

## Usage

Here's a simple example of how to use Pulsejs:

```javascript
const pulse = require('./pulsejs');

const app = pulse();

app.get('/', (req, res) => {
   res.send('Hello, world!');
});

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});
```

## API

### `pulse()`

Creates a new Pulsejs application.

### `app.get(path, handler)`

Registers a GET route.

- `path` (string): The route path.
- `handler` (function): The function to handle the request.

### `app.listen(port, callback)`

Starts the server on the specified port.

- `port` (number): The port number.
- `callback` (function): The function to call when the server starts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
