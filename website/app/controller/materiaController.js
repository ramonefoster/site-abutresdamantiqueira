const firebase = require('../../config/firedb')
const Materias = require('../../config/models/materias')
const firestore = firebase.firestore()
const { format } = require('date-fns')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = jsdom;

exports.addMateria = async (req, res) => {
    try {
        const titulo = req.body.materia_titulo
        const subtitulo = req.body.materia_subtitulo
        const conteudo = req.body.materia_conteudo
        const tags = req.body.materia_tag

        const imgDom = new JSDOM(conteudo, { includeNodeLocations: true })
        const xd = imgDom.window.document.querySelector("img")
        imgHTML = xd.src
      
        //associa autor a materia
        // admin.auth().getUser(uid).then

        if (!titulo || !conteudo) {
            res.render('editor', { alert: 'Insira titulo e conteudo.' })
        } else {
            await firestore.collection('materias').add({
                "id": new Date().valueOf().toString(),
                "titulo": titulo,
                "subtitulo": subtitulo,
                "conteudo": conteudo,
                "dataMateria": new Date(),
                "tag": tags,
                "imagem": imgHTML
            })
            res.render('editor', { success: 'Materia publicada com sucesso' })
        }

    } catch (error) {
        console.log(error)
        res.render('editor', { alert: 'Algo inesperado ocorreu. Tente novamente.' })

    }
}

//add user name associar as materias
// admin
//   .auth()
//   .createUser({
//     email: 'user@example.com',
//     emailVerified: false,
//     phoneNumber: '+11234567890',
//     password: 'secretPassword',
//     displayName: 'John Doe',
//     photoURL: 'http://www.example.com/12345678/photo.png',
//     disabled: false,
//   })
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log('Successfully created new user:', userRecord.uid);
//   })
//   .catch((error) => {
//     console.log('Error creating new user:', error);
//   });


//mysql
// exports.addNovaMateria = async (req, res) => {
//     let titulo_materia = req.body.materia_titulo
//     let subtitulo_materia = req.body.materia_subtitulo
//     let conteudo_materia = req.body.materia_conteudo

//     if (!titulo_materia || !conteudo_materia) {
//         res.render('editor', { alert: 'Insira titulo e conteudo.' })
//     }
//     else {
//         await Materias.create({
//             titulo_materia: req.body.materia_titulo,
//             subtitulo_materia: req.body.materia_subtitulo,
//             conteudo_materia: req.body.materia_conteudo
//         }).then(results => {
//             res.render('editor', { success: 'Materia publicada com sucesso' })
//         }).catch(some => {
//             console.log('Erro: ' + some)
//             res.render('editor', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
//         })
//     }
// }