import { Toaster } from "react-hot-toast";

const Notification = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#0f172a",
          color: "#e2e8f0",
          border: "1px solid rgba(148,163,184,0.2)",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
        },

        success: {
          style: {
            border: "1px solid rgba(34,197,94,0.4)",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#0f172a",
          },
        },

        error: {
          style: {
            border: "1px solid rgba(239,68,68,0.4)",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#0f172a",
          },
        },
      }}
    />
  );
};

export default Notification;