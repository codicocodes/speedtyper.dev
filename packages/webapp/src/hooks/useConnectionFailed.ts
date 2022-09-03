import { useEffect, useState } from "react";

export default (socket: any) => {
  const [connectionFailed, setConnectionFailed] = useState(
    !!socket && !socket.socket?.connected
  );

  useEffect(() => {
    if (socket) {
      socket.subscribe("connect_error", () => {
        setConnectionFailed(true);
      });
      socket.subscribe("connect", () => {
        setConnectionFailed(false);
      });
    }
  }, [socket]);

  return connectionFailed;
};
