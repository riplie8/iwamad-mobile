import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Button} from 'react-native';

export default function App() {
  const [likes, setLikes] = useState(0); 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.text}>Akhmet Sultan</Text>
      <StatusBar style="auto" />
      <Text style={styles.text1}>Likes: {likes}</Text>
      <Pressable 
        onPress={() => setLikes(likes + 1)} 
        style={styles.button}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF5F5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 32,
  },

  text1: {
    marginVertical: 30,
    fontSize: 30,
  },

  button: {
    minHeight: 44,
    backgroundColor: '#010AFF',
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  }
});
