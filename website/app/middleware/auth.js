//autenticacao de usuarios

const firebase = require('../../config/firedb')
const firestore = firebase.firestore()
const config = require('./../../config/config')

// firebase.initializeApp(config.firebaseConfig)

exports.SignUpWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            return JSON.stringify(user)
        })
        .catch(function (error) {
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode == 'auth/weak-password') {
                return { err: 'Senha muito fraca' }
            } else {
                return { err: errorMessage }
            }
            return { err: error }
        })
}

exports.SignInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode == 'auth/wrong-password') {
                return { err: 'Senha incorreta' }
            } else {
                return { err: errorMessage }
            }
            return { err: error }
        })
}

exports.SignOut = () => {
    return firebase.auth().signOut().catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message

        return { err: error }
    });
}




