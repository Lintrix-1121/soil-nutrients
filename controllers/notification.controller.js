const db = require('../models');
const Notification = db.notification;

exports.PostNotification = async (req, res) => {
    try {
        const { message } = req.body;

        const newNotification = await Notification.create({
            message,
        });

        res.status(201).json({ message: 'Notification saved successfully!', data: newNotification });
    } catch (error) {
        console.error('Error saving notification:', error);
        res.status(500).json({ error: 'An error occurred while saving the notification.' });
    }
};


exports.GetNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            order: [['timestamp', 'DESC']], // Sorting by timestamp in descending order
        });

        res.status(200).json({ message: 'Notifications retrieved successfully!', data: notifications });
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        res.status(500).json({ error: 'An error occurred while retrieving notifications.' });
    }
};