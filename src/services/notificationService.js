import axiosInstance from "@/axiosConfig";

export const sendNotification = async (notificationData) => {
    try {
      const response = await axiosInstance.post('/Notification', notificationData);
      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  };
  export const fetchNotifications = async (recipient) => {
    try {
      const response = await axiosInstance.get(`/Notification/to/${recipient}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  };
  export const deleteNotification = async (id) => {
    try {
      const response = await axiosInstance.delete(`/Notification/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  };