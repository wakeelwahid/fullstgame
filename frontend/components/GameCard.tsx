import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface GameCardProps {
  game: {
    id: number;
    title: string;
    openTime: string;
    closeTime: string;
    status: string;
    color: string;
    bgColor: string;
  };
  onPlayNow: (game: any) => void;
}

export default function GameCard({ game, onPlayNow }: GameCardProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [liveTime, setLiveTime] = useState(() => {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date());
  });

  useEffect(() => {
    // Continuous pulse animation for status
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Rotation animation for icon
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  // Update live time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date());
      setLiveTime(time);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handlePress = () => {
    onPlayNow(game);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        style={[
          styles.gameCard, 
          { 
            backgroundColor: game.bgColor,
            borderColor: game.color,
          }
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.gameHeader}>
          <View style={styles.titleContainer}>
            <Animated.Text 
              style={[
                styles.gameIcon,
                {
                  transform: [{ rotate: rotateInterpolate }],
                }
              ]}
            >
              {game.title.includes('24') ? '🎯' : game.id <= 4 ? '⭐' : '💎'}
            </Animated.Text>
            <Text style={[styles.gameTitle, { color: game.color }]}>
              {game.title}
            </Text>
          </View>
        </View>

        <View style={styles.gameDetails}>
          <View style={styles.gameTime}>
            <Text style={styles.timeLabel}>Open:</Text>
            <Text style={styles.timeValue}>{game.openTime}</Text>
          </View>
          <View style={styles.gameTime}>
            <Text style={styles.timeLabel}>Close:</Text>
            <Text style={styles.timeValue}>{game.closeTime}</Text>
          </View>
          <View style={styles.gameTime}>
            <Text style={styles.timeLabel}>🔴 Live:</Text>
            <Text style={[styles.timeValue, { color: '#00ff88' }]}>{liveTime}</Text>
          </View>
        </View>

        <Animated.Text 
          style={[
            styles.gameStatus,
            {
              transform: [{ scale: pulseAnim }],
            }
          ]}
        >
          {game.status}
        </Animated.Text>

        <TouchableOpacity 
          style={[styles.playButton, { backgroundColor: game.color }]}
          onPress={handlePress}
        >
          <Text style={styles.playButtonText}>Play Now →</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    marginBottom: 15,
  },
  gameCard: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gameHeader: {
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameDetails: {
    marginBottom: 10,
  },
  gameTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  timeLabel: {
    color: '#999',
    fontSize: 12,
  },
  timeValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gameStatus: {
    color: '#00FF88',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  playButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  playButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});