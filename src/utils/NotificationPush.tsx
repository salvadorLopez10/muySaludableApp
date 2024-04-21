import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";


export const NotificationPush = () => {
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    async function sendPushNotification(expoPushToken: string, title: string, body: string) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    async function schedulePushNotification(title: string, body: string) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: { data: "goes here" },
        },
        trigger: { seconds: 30 },
      });
    }

    function handleRegistrationError(errorMessage: string) {
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    async function registerForPushNotificationsAsync() {
        let token;
        
        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                //alert("Failed to get push token for push notification!");
                alert("No se ha concedido el permiso para recibir notificaciones!");
                return;
            }
            const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
            if (!projectId) {
              handleRegistrationError("Project ID not found");
            }
            try {
              const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                  projectId,
                })
              ).data;
              console.log(pushTokenString);
              return pushTokenString;
            } catch (e: unknown) {
              handleRegistrationError(`${e}`);
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

            console.log(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        return token;
    }

    return {
        notification,
        notificationListener,
        responseListener,
        setNotification,
        registerForPushNotificationsAsync,
        schedulePushNotification,
        sendPushNotification
    }
}

