import { AsyncStorage, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { danger } from './theme';

const CHANNEL_ID = 'daily-notifications';
const NOTIFICATION_KEY = 'UdaciCards:notifications';

const rescheduleNotification = () => {
  Notifications.cancelAllScheduledNotificationsAsync();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);

  Notifications.scheduleLocalNotificationAsync(createNotification(), {
    time: tomorrow,
  });

  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
};

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createChannel() {
  return {
    name: 'Study Reminder',
    description: "Don't forget to study today!",
    priority: 'high',
    sound: true,
  };
}

function createNotification() {
  return {
    title: 'Study Reminder',
    body: "Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      channelId: CHANNEL_ID,
      color: danger,
      sticky: false,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            if (Platform.OS === 'android') {
              Notifications.createChannelAndroidAsync(
                CHANNEL_ID,
                createChannel()
              )
                .then(() => rescheduleNotification)
                .catch((err) => {
                  console.log('err', err);
                });
            } else {
              rescheduleNotification();
            }
          }
        });
      }
    });
}
