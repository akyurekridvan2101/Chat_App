## 🔧 Installation & Running the App

### 1. Open a terminal in the root folder and install dependencies:

```bash
npm install
```

> This will install all required project dependencies.
> 

---

### 2. Start the server by navigating to the `script` folder and running:

```bash
node server.js
```

> The server will start on localhost:7000.
> 

If you want to use a different port, update the port number in **both** `index.html` and `server.js` files.

- In `index.html`:

```jsx
const socket = new WebSocket('ws://localhost:7000');
```

- In `server.js`:

```jsx
const wss = new WebSocket.Server({ port: 7000 });
```

> ⚠️ Make sure both files use the same port number.
> 

---

### 3. To test the app in your browser:

- Open the `index.html` file (in the root folder) **in your browser**.
- You can open multiple tabs on the same computer to test the chat as different users.

> ⚠️ This app only works on localhost, as the WebSocket connection is set to ws://localhost:7000.
>
