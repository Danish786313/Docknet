const { SUCCESS, FAIL } = require("../helper/constants");
const Response = require("../helper/response");
const { prescription_setting, docter, docterInfo } = require("../models")
const PDFDocument = require('pdfkit');
const moment = require("moment")
const path = require("path")

function buildPDF(req, res, dataCallback, endCallback) {

    let doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    //Line
    doc
        .moveTo(req.body.line.start, req.body.line.height)
        .lineTo(req.body.line.end, req.body.line.height)
        .fillColor(req.body.line.color)
        .stroke();

    // logo
    doc.image(path.join(__dirname, `../upload/${req.profile.docterInfo.logo.split('/').slice(-1).toString()}`), 
        req.body.logo.horizonAlign, 
        req.body.logo.verticalAlign, {
            width: req.body.logo.width, 
            height: req.body.logo.height,
    })

    //Qrcode
    doc.image(path.join(__dirname, `../upload/${req.profile.docterInfo.logo.split('/').slice(-1).toString()}`), 
        req.body.qrCode.horizonAlign, 
        req.body.qrCode.verticalAlign, {
            width: req.body.qrCode.width, 
            height: req.body.qrCode.height,
    })
    // Name
    doc
        // .font(req.body.name.font)
        .fontSize(req.body.name.fontSize)
        .fillColor(req.body.name.color)
        .text("Dr. " + `${req.profile.fullName}`, req.body.name.width, req.body.name.height)
    //speciality
    doc
        .font(req.body.speciality.font)
        .fontSize(req.body.speciality.fontSize)
        .fillColor(req.body.speciality.color)
        .text(`${req.profile.speciality}`, req.body.speciality.width, req.body.speciality.height)
    //Title
    doc
        .font(req.body.title.font)
        .fontSize(req.body.title.fontSize)
        .fillColor(req.body.title.color)
        .text(`${req.body.title.titleName}`, req.body.title.width, req.body.title.height)
    //Cname
    doc
        .font(req.body.cname.font)
        .fontSize(req.body.cname.fontSize)
        .fillColor(req.body.cname.color)
        .text(`${req.body.cname.cname}`, req.body.cname.width, req.body.cname.height)
    // Email
    doc
        .font(req.body.email.font)
        .fontSize(req.body.email.fontSize)
        .fillColor(req.body.email.color)
        .text(`${req.profile.email}`, req.body.email.width, req.body.email.height)
    // Address
    doc
        .font(req.body.address.font)
        .fontSize(req.body.address.fontSize)
        .fillColor(req.body.address.color)
        .text(`${req.profile.clinicAddress}`, req.body.address.width, req.body.address.height)
    // phone
    doc
        .font(req.body.phone.font)
        .fontSize(req.body.phone.fontSize)
        .fillColor(req.body.phone.color)
        .text(`${req.profile.phone}`, req.body.phone.width, req.body.phone.height)
    // patient
    doc
        .font(req.body.patient.font)
        .fontSize(req.body.patient.fontSize)
        .fillColor(req.body.patient.color)
        .text("Dear " + `${req.body.patient.patientName}`, req.body.patient.width, req.body.patient.height)
    // dexcription
    doc
        .font(req.body.description.font)
        .fontSize(req.body.description.fontSize)
        .fillColor(req.body.description.color)
        .text("Dear " + `${req.body.description.descriptionNote}`, req.body.description.width, req.body.description.height)
        
    // date
    doc
        .font(req.body.date.font)
        .fontSize(req.body.date.fontSize)
        .fillColor(req.body.date.color)
        .text(moment().format("LL"), req.body.date.width, req.body.date.height)

    // signature
    doc.image(path.join(__dirname, `../upload/maxresdefault.jpg`), 
        req.body.signature.horizonAlign, 
        req.body.signature.verticalAlign, {
            width: req.body.signature.width, 
            height: req.body.signature.height,
    })
    // Frame
    const distanceMargin = 18;
    doc
        .fillAndStroke('#0e8cc3')
        .lineWidth(20)
        .lineJoin('round')
        .rect(
            distanceMargin,
            distanceMargin,
            doc.page.width - distanceMargin * 2,
            doc.page.height - distanceMargin * 2,
            )
            .stroke();
    // Foter
    doc
        .fontSize(14)
        .fillColor("black")
        .text("Powerd By ", 50, 705, {continued: true})
        .image(path.join(__dirname, `../upload/download.png`), {
            width: 80, 
            height: 20,
    })
    console.log(endCallback)
    doc.end(); 
    
}



async function buildPDF2(req, res, dataCallback, endCallback) {
    
        let doc = new PDFDocument();
        doc.on('data', dataCallback);
        doc.on('end', endCallback);
        let fileObj = req.files
        let Psetting = await prescription_setting.findOne({where: {docter_id: req.profile.id }})
        let docterdata = await docter.findOne({where: {id: req.profile.id}, include:[{model: docterInfo}]}) 

        // line
        let line = JSON.parse(Psetting.line)
        doc
            .moveTo(line.start, line.height)
            .lineTo(line.end, line.height)
            .fillColor(line.color)
            .stroke();
    
        // logo
            let logo = JSON.parse(Psetting.logo)
            if (logo.required == true) {
                doc.image(path.join(__dirname, `../upload/${Psetting.logo_url.split("/").slice(-1).toString()}`), 
                logo.horizonAlign, 
                logo.verticalAlign, {
                    width: logo.width, 
                    height: logo.height,
            })
        }
            
        //Qrcode
        if (fileObj.qrCode) {
            let qrcode = JSON.parse(Psetting.qrcode)
            doc.image(path.join(__dirname, `../upload/${fileObj.qrCode[0].filename}`), 
            qrcode.horizonAlign, 
            qrcode.verticalAlign, {
                    width: qrcode.width, 
                    height: qrcode.height,
            })
        }
        // Name
            let name = JSON.parse(Psetting.name)
            if (name.required == true) {
                doc
                .font(name.font)
                .fontSize(name.fontSize)
                .fillColor(name.color)
                .text("Dr. " + name.fullName, name.width, name.height)
            }
        //speciality
            let speciality = JSON.parse(Psetting.speciality)
            if (speciality.required == true) {
                doc
                .font(speciality.font)
                .fontSize(speciality.fontSize)
                .fillColor(speciality.color)
                .text(speciality.speciality, speciality.width, speciality.height)
            }
        
        //Title
        let title = JSON.parse(Psetting.title)
        doc
            .font(title.font)
            .fontSize(title.fontSize)
            .fillColor(title.color)
            .text(`${req.body.title}`, title.width, title.height)
        //Cname

            let cname = JSON.parse(Psetting.cname)
            if (cname.required == true) {
                doc
                .font(cname.font)
                .fontSize(cname.fontSize)
                .fillColor(cname.color)
                .text(`${cname.cname}`, cname.width, cname.height)
            }
            
        
        
        // Email
            let email = JSON.parse(Psetting.email)
            if (email.required == true) {
                doc
                .font(email.font)
                .fontSize(email.fontSize)
                .fillColor(email.color)
                .text(`${email.email}`, email.width, email.height)
            }
            

        // Address
        let address = JSON.parse(Psetting.address)
        if (address.required == true) {
            doc
            .font(address.font)
            .fontSize(address.fontSize)
            .fillColor(address.color)
            .text(`${address.address}`, address.width, address.height)
        }
        // phone
        let phone = JSON.parse(Psetting.phone)
        if (phone.required == true) {
            doc
            .font(phone.font)
            .fontSize(phone.fontSize)
            .fillColor(phone.color)
            .text(`${phone.phone}`, phone.width, phone.height)
        }
        // patient
        let patient = JSON.parse(Psetting.patient)
        doc
            .font(patient.font)
            .fontSize(patient.fontSize)
            .fillColor(patient.color)
            .text("Dear " + `${req.body.patient}`, patient.width, patient.height)
        // dexcription
        let description = JSON.parse(Psetting.description)
        doc
            .font(description.font)
            .fontSize(description.fontSize)
            .fillColor(description.color)
            .text("Dear " + `${req.body.description}`, description.width, description.height)
            
        // date
        let date = JSON.parse(Psetting.date)
        doc
            .font(date.font)
            .fontSize(date.fontSize)
            .fillColor(date.color)
            .text(moment().format("LL"), date.width, date.height)
    
        // signature
            let signature = JSON.parse(Psetting.signature)
            if (signature.required == true) {
                doc.image(path.join(__dirname, `../upload/${Psetting.signature_url.split("/").slice(-1).toString()}`), 
                signature.horizonAlign, 
                signature.verticalAlign, {
                    width: signature.width, 
                    height: signature.heigth,
            })
        }
        
        // Frame
        // const distanceMargin = 18;
        // doc
        //     .fillAndStroke('#0e8cc3')
        //     .lineWidth(20)
        //     .lineJoin('round')
        //     .rect(
        //         distanceMargin,
        //         distanceMargin,
        //         doc.page.width - distanceMargin * 2,
        //         doc.page.height - distanceMargin * 2,
        //         )
        //         .stroke();
        // Foter
        doc
            .fontSize(14)
            .fillColor("black")
            .text("Powerd By ", 50, 705, {continued: true})
            .image(path.join(__dirname, `../docs/productlogo.png`), {
                width: 80, 
                height: 20,
        })
        doc.end();
}


module.exports = { buildPDF2 };