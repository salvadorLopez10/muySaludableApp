import {
  AVPlaybackStatus,
  ResizeMode,
  Video as ExpoVideo,
  VideoFullscreenUpdateEvent,
} from "expo-av";
import { useEffect, useRef, useState } from "react";
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

    const videoRef = useRef<ExpoVideo>(null);
    const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const playFullscreen = async () => {
      if (videoRef.current && !isFullscreen) {
        try {
          await videoRef.current.presentFullscreenPlayer();
          videoRef.current.playAsync();
        } catch (error) {
          console.log("Error presenting fullscreen player", error);
        }
      }
    };

    const handlePlaybackStatusUpdate = (newStatus: AVPlaybackStatus) => {
        if (
          newStatus.isLoaded &&
          newStatus.didJustFinish &&
          !newStatus.isLooping
        ) {
          if (isFullscreen) {
            videoRef.current?.dismissFullscreenPlayer();
          } else {
            onClose();
          }
        }
        setStatus(newStatus);
    };

    const handleClose = () => {
      if (isFullscreen) {
        // Si está en pantalla completa, sal de pantalla completa
        videoRef.current?.dismissFullscreenPlayer();
      }
      onClose();
    };

    const handleFullscreenUpdate = (event: VideoFullscreenUpdateEvent) => {
      console.log("actualización FULL SCREEN");
      console.log(event);
      console.log(event.fullscreenUpdate);
      /**
       * Describing that the fullscreen player is about to present.
       */
      //PLAYER_WILL_PRESENT = 0,
      /**
       * Describing that the fullscreen player just finished presenting.
       */
      //PLAYER_DID_PRESENT = 1,
      /**
       * Describing that the fullscreen player is about to dismiss.
       */
      //PLAYER_WILL_DISMISS = 2,
      /**
       * Describing that the fullscreen player just finished dismissing.
       */
      // PLAYER_DID_DISMISS = 3,
        if (event.fullscreenUpdate === 0 ) { // 0
            setIsFullscreen(true);
        } else if (event.fullscreenUpdate === 1 ) { // 1
            setIsFullscreen(true);
        } else if (event.fullscreenUpdate === 2) { // 2
            setIsFullscreen(false);
        } else if (event.fullscreenUpdate ===3 ) { // 3
            setIsFullscreen(false);
            onClose();
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

      <ExpoVideo
        ref={videoRef}
        source={{ uri: videoUri }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        style={styles.video}
        //onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        shouldPlay
        // isLooping
        onLoad={() => {
          videoRef?.current?.presentFullscreenPlayer();
        }}
        //onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        //onFullscreenUpdate={handleFullscreenUpdate}
      />

      <View style={styles.videoDescriptionContainer}>
        <Text style={styles.videoDescription}>{description}</Text>
        <TouchableOpacity
          style={styles.buttonFullScreen}
          onPress={playFullscreen}
        >
          <Text style={styles.textButtonFullScreen}>
            Ver en Pantalla Completa
          </Text>
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
    height: "50%",
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
    marginBottom: 10,
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