const ActivityFeed = ({ activities }) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-lg">
      <h2 className="font-bold text-xl mb-4">
        Activity Feed
      </h2>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-slate-100 p-3 rounded-xl"
          >
            <p>{activity.text}</p>

            <span className="text-xs text-gray-500">
              {activity.time.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;