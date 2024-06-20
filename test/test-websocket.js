const io = require('socket.io-client');
const { ObjectId } = require('mongodb');

const userAId = new ObjectId('6673fa448167013be894537f').toHexString();
const userBId = new ObjectId('6673f9c38167013be894537c').toHexString();

console.log('Starting WebSocket client...');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  socket.emit('sendMessage', {
    senderId: userAId,
    recipientId: userBId,
    content: 'Hello, User B!',
  });

  socket.emit('getMessages', { userId: userAId });
});

socket.on('receiveMessage', (message) => {
  console.log('Received message:', message);
});

socket.on('messages', (messages) => {
  console.log('Message history:', messages);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('error', (error) => {
  console.error('Error:', error);
});
