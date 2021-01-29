import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { styles } from '../styles/stylesForm'
import firebase from '../utils/firebase'
import 'firebase/auth'
import ButtonInvisible from './ButtonInvisible'
import toast from 'react-native-simple-toast'

export default function LoginForm({changeForm}) {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })

    const iniciarSesion = () => {
        console.log(formLogin)
       firebase.auth().signInWithEmailAndPassword(formLogin.email, formLogin.password)
       .then(()=>{
           console.log("Sesion iniciada")
       })
       .catch((e)=>{
        toast.show(e.message)
       })
    }

    const onChange = (e, type) => {
        setFormLogin({
            ...formLogin, [type]:e.nativeEvent.text
        })
    }    

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder="Correo electronico"
                placeholderTextColor="#969696" 
                onChange={(e)=>{onChange(e, 'email')}}
                />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#969696" 
                secureTextEntry={true}
                onChange={(e)=>{onChange(e, 'password')}}
                />
            
            <Button title="Iniciar sesion" onPress={iniciarSesion} />

            <ButtonInvisible title="Registrate" changeForm={changeForm} />

        </>
    )
}