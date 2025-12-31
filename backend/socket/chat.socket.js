function chatSocket (io) {
    //create connection event
      //add users join event
      //add messages send event
      //add message recive event

      io.on('connection', (socket) => {
        console.log('socket connected' )
      })


    //create disconnect event
}

module.exports = chatSocket;