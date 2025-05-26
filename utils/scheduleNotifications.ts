import * as Notifications from 'expo-notifications';

export async function scheduleDailyNotifications() {
  const messages = [
    { hour: 9, message: "Good morning ☀️ I'm here if you need a chat." },
    { hour: 13, message: "Hope your afternoon is okay. I'm always here 💬" },
    { hour: 18, message: "How was your day? Don't forget to log it 📝" },
    { hour: 19, message: "Evening check-in 🌙 Let's chat if you want to." },
  ];

  for (const { hour, message } of messages) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "I'm here for you 💙",
        body: message,
        sound: 'default',
      },
      trigger: {
        hour,
        minute: 0,
        repeats: true,
      },
    });
  }
}
