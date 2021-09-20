const io =  require('socket.io')(4000, {
    cors: {
        origin: ['http://localhost:3000'],
    },
})

const GroupChatUser = {id: '1', userName: "All"};
let activeUsers = [GroupChatUser];

io.on('connection', (socket) => {

  socket.join(GroupChatUser.id);

  socket.on('login', (userName) => {
    const currentUser = {id: socket.id, userName};
    activeUsers = [...activeUsers, currentUser];
    socket.join(socket.id);
    io.to(socket.id).emit('info about current user', currentUser);
    io.emit('update active users', activeUsers);
  });

  socket.on('chat message', (message) => {
    if(message.to.id === GroupChatUser.id) {
      io.emit('chat message', message);
    } else {
      io.to(message.sender.id).emit('chat message', message);
      io.to(message.to.id).emit('chat message', message);
    }
    
  });

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter(user => user.id !== socket.id);
    io.emit('update active users', activeUsers);
    });
});