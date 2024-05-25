import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { Button } from "react-native";
import { View } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface VideoContentProps {
  videoUri: string;
  description: string;
  title: string;
  onClose: () => void;
}

const VideoContent = ({ videoUri, description, title, onClose }: VideoContentProps) => {

    const videoRef = useRef<Video>(null);
    const [status, setStatus] = useState<AVPlaybackStatus>();

    const playFullscreen = async () => {
      if (videoRef.current) {
        await videoRef.current.presentFullscreenPlayer();
        videoRef.current.playAsync();
      }
    };


  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>

      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        style={styles.video}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <View style={styles.videoDescriptionContainer}>
        <Text style={styles.videoDescription}>{description}</Text>
        <TouchableOpacity style={styles.buttonFullScreen} onPress={playFullscreen}>
          <Text style={styles.textButtonFullScreen}>Ver en Pantalla Completa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    //marginTop: "30%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    //backgroundColor:  "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 20,
    //backgroundColor: "#009144",
  },
  closeButtonText: {
    color: "#FF7F00",
    fontSize: 16,
  },
  video: {
    width: "100%",
    height: 300,
  },
  videoDescriptionContainer: {
    padding: 10,
    alignItems: "center",
  },
  videoDescription: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "Gotham-Book",
  },
  header: {
    backgroundColor: "#faa029",
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    width: "80%",
    borderRadius: 15,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#2E2A21",
  },
  buttonFullScreen: {
    backgroundColor: "white",
    padding: 10,
  },
  textButtonFullScreen: {
    color: "#FF7F00",
    fontSize: 16,
    fontFamily: "Gotham-Book",
  },
});

export default VideoContent;