import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, deleteDoc, doc } from "../firebase"; // Adjust import path
import "../css/Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  // Fetch notifications from Firestore
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const notificationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsList);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };

    fetchNotifications();
  }, []);

  // Handle adding a new notification
  const handleAddNotification = async () => {
    if (newNotification.trim()) {
      try {
        await addDoc(collection(db, "notifications"), {
          message: newNotification,
          type: notificationType,
          createdAt: new Date(),
        });
        setNewNotification(""); // Clear the input field
        // Re-fetch notifications after adding a new one
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const notificationsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsList);
      } catch (error) {
        console.error("Error adding notification: ", error);
      }
    }
  };

  // Handle dismissing a notification
  const handleDismiss = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id)); // Delete from Firestore
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification: ", error);
    }
  };

  return (
    <div className="notification-page">
      <h2>Notifications</h2>

      {/* Input section for creating new notifications */}
      <div className="notification-input">
        <input
          type="text"
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          placeholder="Type a notification message"
        />
        <select
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}
        >
          <option value="success">Success</option>
          <option value="info">Info</option>
          <option value="error">Error</option>
        </select>
        <button onClick={handleAddNotification}>Add Notification</button>
      </div>

      {/* Display Notifications */}
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
            onClick={() => handleDismiss(notification.id)}
          >
            <p>{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
