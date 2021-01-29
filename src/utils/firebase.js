import firebase from 'firebase/app'

firebaseConfig = {
    apiKey: "AIzaSyDZMHrtfV73j3_D1-2HPoebXQ-IjB8Q7fE",
    authDomain: "rncumples.firebaseapp.com",
    projectId: "rncumples",
    storageBucket: "rncumples.appspot.com",
    messagingSenderId: "359540377211",
    appId: "1:359540377211:web:511df0662f0c4adac884de"
  };

const init = firebase.initializeApp(firebaseConfig);

export default init

function fbCrearCumples(formData){
}