import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between 
                 gap-4 p-6 rounded-3xl mb-6
                 bg-gradient-to-r from-cyan-500 to-indigo-600
                 shadow-xl"
    >
      {/* LEFT */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          🚀 Task Management Board
        </h1>
        <p className="text-white/80 mt-1 text-sm">
          Manage your team efficiently & track progress in real-time
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* Live Indicator */}
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-xs text-white">Live</span>
        </div>

        {/* Action Button */}
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:scale-105 transition">
          + New Task
        </button>

      </div>
    </motion.div>
  );
};

export default Header;