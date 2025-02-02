import React, { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Animated } from "react-native";

function LoadingAnimationPlan() {
  const messages = ["Cargando...", "Estamos procesando tu información..."];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Animated.Text style={[styles.indicatorText, { opacity: fadeAnim }]}> 
        {messages[currentMessageIndex]}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "#ffffff",
    fontFamily: "Gotham-Medium",
    textAlign: "center",
  },
});

export default LoadingAnimationPlan;
