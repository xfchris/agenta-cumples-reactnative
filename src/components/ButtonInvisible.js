import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { styles } from '../styles/stylesForm'

export default function ButtonInvisible({ title, changeForm }) {
    return (
        <>
            <TouchableOpacity style={styles.buttonBlock} onPress={changeForm}>
                <Text style={styles.buttonClick}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

