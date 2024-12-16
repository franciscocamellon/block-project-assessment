import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircularBadge = ({ percentage = 71 }) => {
  const radius = 45; // Raio do círculo
  const strokeWidth = 10; // Largura da borda
  const circumference = 2 * Math.PI * radius; // Circunferência total
  const progress = (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg height="20" width="20" viewBox="0 0 20 20">
        {/* Círculo de fundo */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#222"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Círculo de progresso */}
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#00ff80"
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="50, 50"
        />
      </Svg>
      {/* Texto Central */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default CircularBadge;
