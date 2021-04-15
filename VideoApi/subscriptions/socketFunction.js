function signalSocket(io) {
  io.on("connection", (socket) => {
    socket.on("isOnline", (data) => {
      socket.username = data.user_id;
      if (data.isOnline === true) {
        const thisdata = {
          user_id: data.user_id,
          isOnline: true,
        };
        console.log(`${data.user_id} + 'is connected`);
        socket.broadcast.emit("onlineStatus", thisdata);
      }
    });
    socket.on("confirmRequest", (data) => {
      const { recipient_id, sender_id } = data;
      socket.broadcast.emit(`confirm_request_with_${recipient_id}`, data);
    });
    socket.on("declineRequest", (data) => {
      const { recipient_id, sender_id } = data;
      socket.broadcast.emit(`decline_request_with_${recipient_id}`, data);
    });
    socket.on("terminateVideo", (data) => {
      const { recipient_id, sender_id } = data;
      console.log(`${sender_id} is ending video with ${recipient_id}`);
      socket.broadcast.emit(`terminate_video_with_${recipient_id}`, data);
    });
    socket.on("initIceCandidate", (data) => {
      console.log(data);
      const { recipient_id, iceCandidate } = data;
      const iceInfo = {
        recipient_id,
        iceCandidate,
      };
      console.log([recipient_id, iceCandidate, "phaggotadsdas"]);
      socket.broadcast.emit(`iceCandidate_to_${recipient_id}`, iceInfo);
    });

    socket.on("disconnect", (reason) => {
      console.log(`${socket.username}just disconnected`);
      if (socket.username != undefined) {
        const newData = {
          user_id: socket.username,
          isOnline: false,
        };
        socket.broadcast.emit("isOffline", newData);
        return true;
      }
    });
    socket.on("initVideo", (data) => {
      console.log(data);
      const { sender_id, recipient_id } = data;
      console.log([data, "is here already"]);
      socket.broadcast.emit(`init_video_${recipient_id}`, data);
    });
    socket.on("initStream", (data) => {
      const { recipient_id } = data;
      console.log(`${recipient_id}is your fucking reicpient`);
      console.log(data);
      if (recipient_id !== undefined) {
        if (data.type === "offer") {
          console.log(`${data.offer}is an`);
          socket.broadcast.emit(`initStream_offer_${recipient_id}`, data);
        }
        if (data.type === "answer") {
          socket.broadcast.emit(`initStream_answer_${recipient_id}`, data);
        }
      }
    });
  });
}

module.exports = {
  signalSocket,
};
