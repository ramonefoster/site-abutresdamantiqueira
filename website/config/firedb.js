const firebase = require ('firebase')
const config = require('./config')

// const serviceAccount = require('./../../serviceAccountKey.json')

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.DATABASE_URL
// })

const db = firebase.initializeApp(config.firebaseConfig)

module.exports = db