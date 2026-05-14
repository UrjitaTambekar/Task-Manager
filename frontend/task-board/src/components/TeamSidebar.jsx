import OnlineUsers from "./OnlineUsers";

const TeamSidebar = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 
                    rounded-3xl p-5 shadow-2xl 
                    h-full flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold">
          👥 Team
        </h2>

        <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">
          Live
        </span>
      </div>

      {/* SEARCH (optional but pro) */}
      <input
        placeholder="Search member..."
        className="bg-slate-800 border border-slate-700 
                   text-sm rounded-xl px-3 py-2 mb-4 
                   outline-none text-white"
      />

      {/* ONLINE USERS */}
      <div className="flex-1 overflow-y-auto pr-2">
        <OnlineUsers />
      </div>

      {/* FOOTER ACTION */}
      <button className="mt-4 bg-gradient-to-r 
                         from-cyan-500 to-indigo-500 
                         text-white py-2 rounded-xl 
                         font-semibold hover:scale-105 transition">
        + Invite Member
      </button>
    </div>
  );
};

export default TeamSidebar;