import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import firebase from '../utils/firebase'
import 'firebase/auth'

export default function ActionBar({showList, setShowList}) {
    return (
        <View style={styles.viewFooter}>
            
            <Button title="Cerrar sesion" onPress={ () => { firebase.auth().signOut()  }} />
            <Button title={showList? 'Añadir nueva fecha': 'Mostrar lista'} 
            onPress={() => setShowList(!showList)} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30
    }
})
