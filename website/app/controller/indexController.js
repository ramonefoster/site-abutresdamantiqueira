//mysql
// const pool = require('../../config/db_connection')
// const mysql2 = require('mysql2')

// const Materias = require('../../config/models/indexModel') //sql
const Materias = require('../../config/models/materias') //firebase
const cons = require('consolidate')
const cheerio = require('cheerio')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = jsdom;


//firebase
const firebase = require('../../config/firedb')
const firestore = firebase.firestore()

//FIREBASE
exports.loadAll = async (req, res) => {
    try {
        const materias = await firestore.collection('materias')
        const data = await materias.get()

        if (data.empty) {
            res.render('noticias', { alert: 'Nenhum post foi encontrado.' })
        } else {
            const materiasArray = []
            data.forEach(doc => {
                const materia = new Materias(
                    doc.data().id,
                    doc.data().titulo,
                    doc.data().subtitulo,
                    doc.data().conteudo,
                    doc.data().dataMateria,
                    doc.data().tag,
                    doc.data().imagem
                )
                materiasArray.push(materia)
            })
            // console.log(materiasArray)
            res.render('noticias', { materiasArray })

        }

    } catch (error) {
        console.log(error)
        res.render('noticias', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
    }
}

exports.loadIndex = async (req, res) => {
    try {
        const TodasMaterias = await firestore.collection('materias')
        const data = await TodasMaterias.orderBy('dataMateria', 'desc').limit(3).get()

        if (data.empty) { 

            res.render('index')
        }
        else {
            const materiasArray = []
            data.forEach(doc => {
                const mat = new Materias(
                    doc.data().id,
                    doc.data().titulo,
                    doc.data().subtitulo,
                    doc.data().conteudo,
                    doc.data().dataMateria,
                    doc.data().tag,
                    doc.data().imagem

                )
                materiasArray.push(mat)
            })          

            res.render('index', { materiasArray })
        }

    } catch (error) {
        console.log(error)
        res.render('index', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
    }
}


exports.loadOne = async (req, res) => {
    let idNoticia = req.params.id
    try {
        const materias = await firestore.collection('materias')
        const data = await materias.where('id', '==', idNoticia).get();

        if (data.empty) {
            res.render('noticia', { alert: 'Nenhum post foi encontrado.' })
        } else {
            const materiasArray = []
            data.forEach(doc => {
                const materia = new Materias(
                    doc.data().id,
                    doc.data().titulo,
                    doc.data().subtitulo,
                    doc.data().conteudo,
                    doc.data().dataMateria,
                    doc.data().tag,
                    doc.data().imagem
                )
                materiasArray.push(materia)
            })
            res.render('noticia', { materiasArray })

        }

    } catch (error) {
        console.log(error)
        res.render('noticia', { alert: 'Algo inesperado ocorreu. Tente novamente.' })
    }
}



//MYSQL
// exports.load = async (req, res) => {

//     // Titulo Manchete
//     // var titulo_main = await Materias.findOne({ raw: false, attributes: ['titulo_materia'], order: [['id', 'DESC']], limit: 1 })
//     await Materias.findOne({ raw: false, attributes: ['titulo_materia', 'subtitulo_materia', 'conteudo_materia', [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt']], order: [['id', 'DESC']], limit: 1 }).then((result) => {
//         titulo_1 = result.titulo_materia
//         subtitulo_1 = result.subtitulo_materia
//         data_1 = result.createdAt
//         conteudo_main = result.conteudo_materia
//         //lida com parametros html (pega img, neste caso)
//         const img1 = new JSDOM(conteudo_main, { includeNodeLocations: true })  
//         const xd1 = img1.window.document.querySelector("img") 
//         imgHTML = xd1
//     }).catch((error) => {
//         titulo_1 = null
//         subtitulo_1 = null
//         previewMain = null
//         imgHTML = null
//         data_1 = null
//         console.log(error)
//     })
//     //titulo das materias secundarias
//     await Materias.findOne({ attributes: ['titulo_materia', 'subtitulo_materia', 'conteudo_materia', [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt']], order: [['id', 'DESC']], offset: 1, limit: 1 }).then((r) => {
//         titulo_2 = r.titulo_materia
//         subtitulo_2 = r.subtitulo_materia
//         data_2 = r.createdAt
//         conteudo_main = r.conteudo_materia
//         //lida com parametros html (pega img, neste caso)
//         const img2 = new JSDOM(conteudo_main, { includeNodeLocations: true })  
//         const xd2 = img2.window.document.querySelector("img") 
//         imgHTML2 = xd2
//     }).catch((error) => {
//         titulo_2 = null
//         subtitulo_2 = null
//         data_2 = null
//         imgHTML2 = null
//     })
//     await Materias.findOne({ attributes: ['titulo_materia', 'subtitulo_materia', 'conteudo_materia', [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt']], order: [['id', 'DESC']], offset: 2, limit: 1 }).then((r) => {
//         titulo_3 = r.titulo_materia
//         subtitulo_3 = r.subtitulo_materia
//         data_3 = r.createdAt
//         conteudo_main = r.conteudo_materia
//         //lida com parametros html (pega img, neste caso)
//         const img3 = new JSDOM(conteudo_main, { includeNodeLocations: true })  
//         const xd3 = img3.window.document.querySelector("img") 
//         imgHTML3 = xd3
//     }).catch((error) => {
//         titulo_3 = null
//         subtitulo_3 = null
//         data_3 = null
//         imgHTML3 = null
//     })
//     await Materias.findOne({ attributes: ['titulo_materia', 'subtitulo_materia', 'conteudo_materia', [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt']], order: [['id', 'DESC']], offset: 3, limit: 1 }).then((r) => {
//         titulo_4 = r.titulo_materia
//         subtitulo_4 = r.subtitulo_materia
//         data_4 = r.createdAt
//         conteudo_main = r.conteudo_materia
//         //lida com parametros html (pega img, neste caso)
//         const img4 = new JSDOM(conteudo_main, { includeNodeLocations: true })  
//         const xd4 = img4.window.document.querySelector("img") 
//         imgHTML4 = xd4
//     }).catch((error) => {
//         titulo_4 = null
//         subtitulo_4 = null
//         data_4 = null
//         imgHTML4 = null
//     })

//     res.render('index', { titulo_1, titulo_2, titulo_3, titulo_4, subtitulo_1, subtitulo_2, subtitulo_3, subtitulo_4, 
//         data_1, data_2, data_3, data_4, imgHTML, imgHTML2, imgHTML3, imgHTML4 })
// }