const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A new client connected');

  socket.on('joinVehicle', (vehicleId) => {
    // Join a room specific to the vehicle ID
    socket.join(vehicleId);
    console.log(`Client joined vehicle room: ${vehicleId}`);
  });

  socket.on('bikeLocationUpdate', (location) => {
    console.log('Received bike location update:', location);

    // Emit the bike's location update to the specific vehicle room
    io.to(location.vehicleId).emit('bikeLocationUpdate', location);
    console.log(location.vehicleId);
    
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
