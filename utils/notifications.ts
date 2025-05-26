import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications not granted.');
    return;
  }

  Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });
}

export async function scheduleDailyNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const times = [
    { hour: 9, minute: 0, body: "I'm here for you if you need a chat now 💬" },
    { hour: 13, minute: 0, body: "Hey, I'm still here if you want to talk 🤝" },
    { hour: 18, minute: 0, body: "How was your day? Don't forget to log it 📝" },
    { hour: 19, minute: 0, body: "Just a nudge—I'm always here if needed 💙" },
  ];

  for (const { hour, minute, body } of times) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Safe Space 💙',
        body,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  }
}
