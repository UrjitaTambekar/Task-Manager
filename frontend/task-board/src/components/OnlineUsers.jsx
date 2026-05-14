import { useEffect, useState } from "react";
import socket from "../services/socket";

const OnlineUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 🟢 Receive online users list
    socket.on("onlineUsers", (data) => {
      setUsers(data);
    });

    return () => socket.off("onlineUsers");
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-700 
                    rounded-3xl p-5 shadow-xl">

      <h2 className="text-white font-bold text-lg mb-4">
        👥 Online Users
      </h2>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {users.length === 0 && (
          <p className="text-slate-400 text-sm">
            No one online
          </p>
        )}

        {users.map((user, i) => (
          <div
            key={i}
            className="flex items-center justify-between 
                       bg-slate-800 p-3 rounded-xl 
                       border border-slate-700"
          >
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-r 
                              from-cyan-400 to-indigo-500 
                              flex items-center justify-center 
                              text-white font-bold">
                {user.name?.charAt(0) || "U"}
              </div>

              <p className="text-slate-200 font-medium">
                {user.name}
              </p>
            </div>

            {/* Online Indicator */}
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;