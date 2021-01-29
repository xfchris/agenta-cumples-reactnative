import React, {useState} from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { isEmail } from '../utils/helpers'
import firebase from 'firebase/app'
import { styles } from '../styles/stylesForm'
import ButtonInvisible from './ButtonInvisible'

export default function RegisterForm({changeForm}) {

    const [formData, setFormData] = useState(defaultValue)
    const [formError, setFormError] = useState({})

    const registrar = () => {
        let error = {}
        if (!formData.email || !formData.password || !formData.repeatPassword){
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
            if (!formData.repeatPassword) error.repeatPassword = true;
        }else if (formData.password !== formData.password){
            error.password = true;
            error.repeatPassword = true;
        }else if (!isEmail(formData.email)){
            error.email = true
        }else if (formData.password.length < 6){
            error.password = true;
        }else{
            console.log(formData)
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                console.log("usuario creado")
            })
            .catch(()=>{
                console.log("Se produjo un error con firebase al crear el usuario")
                error.email = true
                error.password = true
                error.repeatPassword = true
            })
        }
        setFormError(error)
    }

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo"
                placeholderTextColor="#969696" 
                onChange={(e)=>setFormData({...formData, email: e.nativeEvent.text})}
            />

            <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696" 
                secureTextEntry={true}
                onChange={(e)=>setFormData({...formData, password: e.nativeEvent.text})}

            />

            <TextInput
                style={[styles.input, formError.repeatPassword && styles.error]}
                placeholder="Repetir contraseña"
                placeholderTextColor="#969696" 
                secureTextEntry={true}
                onChange={(e)=>setFormData({...formData, repeatPassword: e.nativeEvent.text})}
            />
           
            <Button title="Registrate" onPress={registrar} />

            <ButtonInvisible title="Iniciar sesion" changeForm={changeForm} />
        </>
    )
}

function defaultValue(){
    return {
        email: '',
        password: '',
        repeatPassword: ''
    }
}