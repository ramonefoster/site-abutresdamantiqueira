const firebase = require('../../config/firedb')
const Viveiro = require('../../config/models/viveiro')
const firestore = firebase.firestore()
const { format } = require('date-fns')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = jsdom;
require("firebase/storage")
const multer = require('multer');
const { callbackPromise } = require('nodemailer/lib/shared');
global.XMLHttpRequest = require("xhr2");

const Auth = require('../middleware/auth')
const bodyParser = require('body-parser');
const firebase2 = require ('firebase')

let userlogged
firebase2.auth().onAuthStateChanged((user) => {
    if (user) {
        userlogged = user
    } else {
        userlogged = null
    }
})

exports.addViveiro = async (req, res) => {
    if (userlogged) {
        try {
            especie = req.body.especie
            descricao = req.body.descricao
            quantidade = req.body.quantidade
            tag = req.body.tag
            preco = req.body.preco
            img = req.file

            //image upload no storage
            const ref = firebase.storage().ref()
            const name = new Date() + '-' + img.originalname
            const file = req.file
            const metadata = {
                contentType: file.mimetype
            }
            const task = ref.child(name).put(file.buffer, metadata)

            let imgurl = await task.then(snapshot => snapshot.ref.getDownloadURL())

            if (!especie) {
                res.render('membro-viveiro', { alert: 'Insira nome da especie' })
            } else {
                if (!quantidade) quantidade = 0
                if (!preco) preco = 0
                await firestore.collection('viveiro').doc(especie).set({
                    "id": new Date().valueOf().toString(),
                    "especie": especie,
                    "descricao": descricao,
                    "quantidade": quantidade,
                    "preco": preco,
                    "tag": tag,
                    "imagem": imgurl
                })
                try {
                    const viveiro = await firestore.collection('viveiro')
                    const data = await viveiro.get()

                    if (data.empty) {
                        res.render('membro-viveiro', { alert: 'Nenhum post foi encontrado.' })
                    } else {
                        const viveiroArray = []
                        data.forEach(doc => {
                            const especie = new Viveiro(
                                doc.data().id,
                                doc.data().especie,
                                doc.data().descricao,
                                doc.data().quantidade,
                                doc.data().tag,
                                doc.data().preco,
                                doc.data().imagem
                            )
                            viveiroArray.push(especie)
                        })
                        // console.log(materiasArray)
                        res.render('membro-viveiro', { viveiroArray })

                    }

                } catch (error) {
                    console.log(error)
                    res.render('membro-viveiro', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
                }
            }

        } catch (error) {
            console.log(error)
            res.render('membro-viveiro', { alert: 'Algo inesperado ocorreu. Tente novamente.' })

        }
    } else {
        res.render('admin')
    }
}


//FIREBASE
exports.loadAllViveiro = async (req, res) => {
    if (userlogged) {
        try {
            const viveiro = await firestore.collection('viveiro')
            const data = await viveiro.get()

            if (data.empty) {
                res.render('membro-viveiro', { alert: 'Nenhum post foi encontrado.' })
            } else {
                const viveiroArray = []
                data.forEach(doc => {
                    const especie = new Viveiro(
                        doc.data().id,
                        doc.data().especie,
                        doc.data().descricao,
                        doc.data().quantidade,
                        doc.data().tag,
                        doc.data().preco,
                        doc.data().imagem
                    )
                    viveiroArray.push(especie)
                })
                // console.log(materiasArray)
                res.render('membro-viveiro', { viveiroArray })

            }

        } catch (error) {
            console.log(error)
            res.render('membro-viveiro', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
        }
    } else {
        res.render('admin')
    }
}

exports.loadAllEdit = async (req, res) => {
    if (userlogged) {
        try {
            const viveiro = await firestore.collection('viveiro')
            const data = await viveiro.get()

            if (data.empty) {
                res.render('membro-viv-edit', { alert: 'Nenhum post foi encontrado.' })
            } else {
                const viveiroArray = []
                data.forEach(doc => {
                    const especie = new Viveiro(
                        doc.data().id,
                        doc.data().especie,
                        doc.data().descricao,
                        doc.data().quantidade,
                        doc.data().tag,
                        doc.data().preco,
                        doc.data().imagem
                    )
                    viveiroArray.push(especie)
                })
                // console.log(materiasArray)
                res.render('membro-viv-edit', { viveiroArray })

            }

        } catch (error) {
            console.log(error)
            res.render('membro-viv-edit', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
        }
    } else {
        res.render('admin')
    }
}

exports.editaViv = async (req, res) => {
    if (userlogged) {
        try {
            especie = req.body.especie
            descricao = req.body.descricao
            quantidade = req.body.quantidade
            tag = req.body.tag
            preco = req.body.preco

            if (!especie) {
                res.render('membro-viv-edit', { alert: 'Insira nome da especie' })
            } else {
                if (!quantidade) quantidade = 0
                if (!preco) preco = 0
                await firestore.collection('viveiro').doc(especie).update({
                    "especie": especie,
                    "descricao": descricao,
                    "quantidade": quantidade,
                    "preco": preco,
                    "tag": tag
                })
                try {
                    const viveiro = await firestore.collection('viveiro')
                    const data = await viveiro.get()

                    if (data.empty) {
                        res.render('membro-viv-edit', { alert: 'Nenhum post foi encontrado.' })
                    } else {
                        const viveiroArray = []
                        data.forEach(doc => {
                            const especie = new Viveiro(
                                doc.data().id,
                                doc.data().especie,
                                doc.data().descricao,
                                doc.data().quantidade,
                                doc.data().tag,
                                doc.data().preco,
                                doc.data().imagem
                            )
                            viveiroArray.push(especie)
                        })
                        // console.log(materiasArray)
                        res.render('membro-viv-edit', { viveiroArray })

                    }

                } catch (error) {
                    console.log(error)
                    res.render('membro-viv-edit', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
                }
            }

        } catch (error) {
            console.log(error)
            res.render('membro-viv-edit', { alert: 'Algo inesperado ocorreu. Tente novamente.' })

        }
    } else {
        res.render('admin')
    }
}

exports.deletaViv = async (req, res) => {
    if (userlogged) {
        try {
            await firestore.collection('viveiro').doc(especie).delete()
            res.render('membro-viv-edit')
            try {
                const viveiro = await firestore.collection('viveiro')
                const data = await viveiro.get()

                if (data.empty) {
                    res.render('membro-viv-edit', { alert: 'Nenhum post foi encontrado.' })
                } else {
                    const viveiroArray = []
                    data.forEach(doc => {
                        const especie = new Viveiro(
                            doc.data().id,
                            doc.data().especie,
                            doc.data().descricao,
                            doc.data().quantidade,
                            doc.data().tag,
                            doc.data().preco,
                            doc.data().imagem
                        )
                        viveiroArray.push(especie)
                    })
                    // console.log(materiasArray)
                    res.render('membro-viv-edit', { viveiroArray })

                }

            } catch (error) {
                console.log(error)
                res.render('membro-viv-edit', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
            }

        } catch (error) {
            console.log(error)
            res.render('membro-viv-edit', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
        }
    } else {
        res.render('admin')
    }


}

