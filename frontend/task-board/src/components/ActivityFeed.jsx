import { motion } from "framer-motion";

const ActivityFeed = ({ activities }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 
                    rounded-3xl p-6 shadow-2xl border border-slate-700">

      {/* Header */}
      <h2 className="text-white text-xl font-bold mb-5 flex items-center gap-2">
        ⚡ Activity Feed
      </h2>

      {/* Empty State */}
      {activities.length === 0 && (
        <p className="text-slate-400 text-sm">
          No activity yet...
        </p>
      )}

      {/* Feed */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 bg-slate-800/70 
                       p-4 rounded-2xl border border-slate-700 
                       hover:border-cyan-400 transition"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-r 
                            from-cyan-400 to-indigo-500 
                            flex items-center justify-center text-white font-bold">
              {activity.user?.name?.charAt(0) || "U"}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-slate-200">
                <span className="font-semibold text-white">
                  {activity.user?.name || "User"}
                </span>{" "}
                {activity.text}
              </p>

              <span className="text-xs text-slate-400">
                {new Date(activity.time).toLocaleTimeString()}
              </span>
            </div>

            {/* Status Indicator */}
            <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;