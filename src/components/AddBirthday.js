import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import {styles as styleForm } from '../styles/stylesForm'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import SimpleToast from 'react-native-simple-toast'
import firebase from '../utils/firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebase)

export default function AddBirthday({user, setShowList, setReloadData}) {
    const [formData, setFormData] = useState({nombres: null, apellidos: null, dateBirth: null})
    const [isDPVisible, setIsDPVisible] = useState(false)

    const hConfirm = (date) => { 
        const dateBirth = date
        dateBirth.setHours(0)
        dateBirth.setMinutes(0)
        dateBirth.setSeconds(0)
        setFormData({...formData, dateBirth})
        setIsDPVisible(false)
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]:e.nativeEvent.text})
    }

    const hideDatePicker = () => setIsDPVisible(false)

    const onSubmit = () => {
        if (!formData.nombres ||
            !formData.apellidos ||
            !formData.dateBirth)
        {
            SimpleToast.show("Uno de los campos está vacio")
        }else{
            const data = formData
            data.dateBirth.setYear(0)

            db.collection(user.uid).add(data)
                .then(()=>{
                    console.log('Guardado en firestone')
                    setReloadData(true)
                    setShowList(true)
                })
                .catch((e)=>{
                    SimpleToast.show("Error: "+e.message)
                })
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styleForm.input}
                    placeholder="Nombres"
                    placeholderTextColor="#969696" 
                    onChange={(e)=>onChange(e, 'nombres')} />

                <TextInput
                    style={styleForm.input}
                    placeholder="Apellidos"
                    placeholderTextColor="#969696" 
                    onChange={(e)=>onChange(e, 'apellidos')} />


                <View style={[styleForm.input, styles.datepicker]}>
                    <Text style={styles.textDate} onPress={() => setIsDPVisible(true) }>
                    {formData.dateBirth ?
                        moment(formData.dateBirth).format('LL')
                        :
                        'Fecha de nacimiento'
                    }    
                    </Text>
                </View>

                <Button title="Crear cumpleaños" onPress={onSubmit} />

            </View>

            <DateTimePickerModal
                isVisible={isDPVisible}
                mode="date"
                onConfirm={hConfirm}
                onCancel={hideDatePicker} />
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDate: {
        color: '#969696',
        fontSize: 18
    },
    datepicker: {
        justifyContent: 'center'
    }
})
