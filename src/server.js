const WebSocket = require('ws');

// Start the WebSocket server
const wss = new WebSocket.Server({ port: 7000 });

// Array to store all connected WebSocket clients
let clients = [];

wss.on('connection', function connection(ws) {
    console.log('New connection received');

    // Variable to store the username of the connected client
    let username;

    // Send a welcome message on initial connection
    ws.send(JSON.stringify({ type: 'system', message: 'Welcome to the server!' }));

    // Handle incoming messages
    ws.on('message', function incoming(message) {
        // If the username is not set, treat the first message as the username
        if (!username) {
            username = message.toString(); // Get the username
            console.log(`${username} has joined`);
            // Send welcome message with username
            ws.send(JSON.stringify({ type: 'system', message: `Welcome, ${username}!` }));
        } else {
            console.log(`Message received: ${message.toString()}`);

            // Broadcast the message to all clients
            broadcastMessage(username, message.toString());
        }
    });

    // Remove client from array when the connection is closed
    ws.on('close', () => {
        console.log('Connection closed or client exited the application!');
        // Remove user from the array on disconnect
        clients = clients.filter(client => client !== ws);
    });

    ws.on('error', (err) => {
        console.error('WebSocket Error:', err);
    });

    // Add the new client to the array
    clients.push(ws);
});

// Function to broadcast a message to all clients via WebSocket
function broadcastMessage(sender, message) {
    // Send message to all connected clients
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'message',
                sender: sender,
                message: message,
                timestamp: new Date().toLocaleTimeString() // Add a timestamp
            }));
        }
    });
}

console.log("WebSocket server is running on port 7000...");
