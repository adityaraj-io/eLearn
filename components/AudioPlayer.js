import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const AudioPlayer = ({ source, name }) => {
  const [isplaying, setIsPlaying] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: source });
        setSound(sound);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [source]);

  const playAndPause = async () => {
    if (sound) {
      if (isplaying) {
        setDisabled(true);
        await sound.pauseAsync();
        setDisabled(false);
      } else {
        setDisabled(true);
        await sound.playAsync();
        setDisabled(false);
      }
      setIsPlaying(!isplaying);
    }
  };

  return (
    <View style={styles.audioView}>
      <TouchableOpacity disabled={disabled || loading} onPress={playAndPause} style={styles.audioOpacity}>
        {error ? (
          <Text style={{ color: 'red' }}>Error loading audio</Text>
        ) : loading ? (
          <ActivityIndicator style={{ alignSelf: 'center' }} size="small" color="white" />
        ) : (
          <>
            <FontAwesome5 name={isplaying ? 'pause' : 'play'} size={20} color="white" />
            <Text style={{ marginHorizontal: 10, fontSize: 16, color: 'white' }}>{name}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  audioView: {
    width: '100%',
    padding: 10,
  },
  audioOpacity: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#DAA520',
    padding: 20,
    borderRadius: 5,
  },
});
