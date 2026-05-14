import OnlineUsers from "./OnlineUsers";

const TeamSidebar = () => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-lg">

      <h2 className="text-xl font-bold mb-4">
        Team Members
      </h2>

      <OnlineUsers />
    </div>
  );
};

export default TeamSidebar;