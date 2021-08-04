const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.enviar = async (req, res) => {
    const email = req.body.vemail
    const name = req.body.vname
    const message = req.body.vmsg
    const msgSite = {
        to: 'ramonefoster@gmail.com',
        from: 'ramonefoster@gmail.com',
        subject: '[VIVEIRO] - Contato pelo site por ' + name,
        html: '<br><b> Email de origem: </b><br>' + email + '<br> Mensagem: <br>' + message
    }
    console.log('email: ', email)
    console.log('name: ', name)
    console.log('msg: ', message)

    sgMail.send(msgSite)

    res.render('viveiro')
}

exports.doacao = async (req, res) => {
    const email = req.body.demail
    const name = req.body.dname
    const message = req.body.dmsg
    const msgSite = {
        to: 'ramonefoster@gmail.com',
        from: 'ramonefoster@gmail.com',
        subject: '[DOACAO] - Contato pelo site por ' + name,
        html: '<br><b> Email de origem: </b><br>' + email + '<br> Mensagem: <br>' + message
    }
    console.log('email: ', email)
    console.log('name: ', name)
    console.log('msg: ', message)

    sgMail.send(msgSite).then(() => {
        MailSuccess = 'A ONG Abutres da Mantiqueira agradece!'
        res.render('doar', { MailSuccess })
    }).catch(() => {
        MailError = 'Houve um erro ao enviar sua mensagem. Voce pode contactar-nos pelo email: abutresdamantiqueira@gmail.com'
        res.render('doar', { MailError })

    })
}

exports.contato = async (req, res) => {
    const email = req.body.cemail
    const name = req.body.cname
    const message = req.body.cmsg
    const assunto = req.body.cassunto
    const empresa = req.body.ccompany
    const msgSite = {
        to: 'ramonefoster@gmail.com',
        from: 'ramonefoster@gmail.com',
        subject: '[' + assunto + ']- Contato pelo site por ' + name,
        html: '<br><b> Email de origem: </b><br>' + email + '<br><b> Empresa: </b><br>' + empresa + '<br> Mensagem: <br>' + message
    }

    console.log('email: ', email)
    console.log('name: ', name)
    console.log('msg: ', message)

    sgMail.send(msgSite).then(() => {
        MailSuccess = 'A ONG Abutres da Mantiqueira agradece!'
        res.render('contato', { MailSuccess })
    }).catch(() => {
        MailError = 'Houve um erro ao enviar sua mensagem. Voce pode contactar-nos pelo email: abutresdamantiqueira@gmail.com'
        res.render('contato', { MailError })

    })
}