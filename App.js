import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View,Button, YellowBox, LogBox } from 'react-native';
import firebase from './src/utils/firebase'
import 'firebase/auth'
import Auth from './src/components/Auth';
import ListBirthay from './src/components/ListBirthay';

LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response)=>{
      setUser(response)
    })
  }, [])

  if (user === undefined) return null;


  return (
    <SafeAreaView style={[styles.container, styles.background]}>
      <StatusBar style={styles.bar} style="light" />
      { user ? <ListBirthay user={user} /> : <Auth /> }
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    paddingTop: Platform.OS === 'android'? 25: 0,
    backgroundColor: "#15212b",
    height: "100%"
  }
});
