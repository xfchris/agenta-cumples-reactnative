import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday'
import firebase from '../utils/firebase'
import 'firebase/firestore'
import moment from 'moment'
import SimpleToast from 'react-native-simple-toast'
import Birthday from './Birthday'

const db = firebase.firestore(firebase)


export default function ListBirthay({ user }) {

    const [showList, setShowList] = useState(false)
    const [birthays, setBirthays] = useState([])
    const [birthaysPasat, setBirthaysPasat] = useState([])
    const [reloadData, setReloadData] = useState(false)
    useEffect(() => {

        db.collection(user.uid)
            .orderBy("dateBirth", "asc")
            .get()
            .then((r) => {
                const itemsArray = []
                r.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id
                    itemsArray.push(data)
                })

                separarCumples(itemsArray)
            })
            .catch((e) => {
                SimpleToast.show(e.message)
            })
            setReloadData(false)
    }, [reloadData])

    function separarCumples(items) {
        const currentDate = moment().set({
            hour: 0, minute: 0, second: 0, millisecond: 0
        })

        const birthayTemp = []
        const pasatBirthdayTemp = []

        items.forEach((item) => {
            const dateBirth = new Date(item.dateBirth.seconds * 1000)
            const dateBirthday = moment(dateBirth)
            const currentYear = moment().get('year')
            dateBirthday.set({ year: currentYear })

            const diffDate = currentDate.diff(dateBirthday, "days")
            const itemTemp = item
            itemTemp.dateBirth = dateBirthday
            itemTemp.days = diffDate

            if (diffDate <= 0) {
                birthayTemp.push(itemTemp)
            }else{
                pasatBirthdayTemp.push(itemTemp)
            }
        })

        setBirthays(birthayTemp)
        setBirthaysPasat(pasatBirthdayTemp)
    }

    const eliminarBirthday = (birthday) => {
        Alert.alert(
            'Eliminar cumpeaños',
            `Estas seguro de eliminar el cumpleaños de ${birthday.nombres} ${birthday.apellidos}`,
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },
                {
                    text:'Eliminar',
                    onPress: () => {
                        db.collection(user.uid).doc(birthday.id)
                        .delete().then(()=>{
                            setReloadData(true)
                        })
                        console.log("Eliminando...")
                    }
                }
            ],
            {cancelable: false}
        )
    }

    return (
        <View style={styles.container}>
            {showList ?
            
                <ScrollView style={styles.scrollView}>
                    {birthays.map((item, index)=> (
                        <Birthday key={index} birthday={item} eliminarBirthday={eliminarBirthday} />
                    ))}

                    {birthaysPasat.map((item, index)=> (
                        <Birthday key={index} birthday={item} eliminarBirthday={eliminarBirthday} />
                    ))}
                </ScrollView>

                :
                <AddBirthday user={user} setShowList={setShowList} setReloadData={setReloadData} />
            }
            <ActionBar showList={showList} setShowList={setShowList} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    scrollView: {
        marginBottom: 50,
        width: '100%',
        height:'100%'
    }
})
