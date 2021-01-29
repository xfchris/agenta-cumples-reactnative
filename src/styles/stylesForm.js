import React from 'react'
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    buttonBlock: {
        flex: 1,
        justifyContent: 'flex-end',
        color: 'black',
        marginBottom: 20,
        alignItems: 'center'
    },
    buttonClick: {
        color: 'white',
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        width: "80%",
        color: "white",
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    error: {
        borderColor: 'red'
    }
})