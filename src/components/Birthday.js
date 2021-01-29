import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Birthday({birthday, eliminarBirthday}) {

    const pasat = birthday.days > 0

    const infoDay = () => {
        if (birthday.days === 0){
            return <Text style={{color:'white'}}>Es su cumpleaños</Text>
        }else{
            const days = -birthday.days
            return (
                <View style={styles.textCurrent}>
                    <Text>{days}</Text>
                    <Text>Dia(s)</Text>
                </View>
            )
        }
    }

    return (
        <TouchableOpacity style={[
            styles.card, 
            pasat ? 
            styles.current:
            (birthday.days === 0 ? styles.actual: styles.pasat)
            ]}
            onPress = {()=>{eliminarBirthday(birthday)}}
            >
            <Text style={styles.userName}>
                {birthday.nombres} {birthday.apellidos}
            </Text>
            {pasat ? <Text style={{color: "white"}}> Pasado</Text>: infoDay()}

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15
    },
    actual: {
        backgroundColor: '#559204'
    },
    pasat: {
        backgroundColor: '#1ae1f2'
    },
    current: {
        backgroundColor: '#820000'
    },
    userName: {
        color: 'white',
        fontSize: 16,
    },
    textCurrent: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12
    }
})
