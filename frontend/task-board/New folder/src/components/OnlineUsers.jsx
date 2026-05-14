const users = [
  "Rahul",
  "Priya",
  "Anurag",
  "Sneha",
];

const OnlineUsers = () => {
  return (
    <div className="space-y-3">

      {users.map((user) => (
        <div
          key={user}
          className="flex items-center gap-3 bg-slate-100 p-3 rounded-xl"
        >
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <p className="font-medium">{user}</p>
        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;