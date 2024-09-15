const useLocalNotification = (alert) => {
    const sendAlert = () => {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification(alert);
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification(alert);
            }
          });
        }
      }
    };
  
    return sendAlert;
  };
  
  export { useLocalNotification };
  