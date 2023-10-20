
const customersModel = require("../models/customersModel")

const customersController = {}




// MELIHAT DATABASE
customersController.getAll = (req,res) => {

    customersModel.getAll((err,rows) => {
        if (err) {
            res.status(500).json({
                message: "HAYOLOH EROR TUH !!"
            })
        } else {
            return res.json({
                status : "OK",
                data : rows 
            })
        }

    })
}

customersController.getId = (req,res) => {
    customersModel.getId(req.params.id, (err,rows) => {
       if (err) {
            res.status(500).json({
                message: "HAYOLOH EROR TUH !!"
            })
        } else if (!rows) {
           res.status(500).json({
               message: "ID NYA GAK ADA WOY !!"
           })
            
        } else {
            return res.json({
                status : "OK",
                data : rows 
            })
        }

    })  
}

// MENAMBAHKAN DATA
customersController.create = (req,res) => {
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email

    if (!name || !address || !email) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!name.match(/^[a-zA-Z ._-]*$/) || !address.match(/^[a-zA-Z ._-]*$/) || !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]*$/)) {
        return res.status(400).json({
            message: "Input NAMA, ADDRESS, DAN EMAIL Harus Berupa Huruf"
        })
    }

    customersModel.create(req.body)
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Ditambahkan"
    })   

}

// MENGHAPUS DATA
customersController.delete = (req,res) => {
    const id = req.body.id

    if (!id) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!Number(id)) {
        return res.status(400).json({
            message: "Input Harus Berupa Angka"
        })
    }
    customersModel.delete((req.body))
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Dihapus"
    })   
}

// MERUBAH DATA
customersController.update = (req,res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email

    if (!id || !name || !address || !email) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!Number(id) ) {
        return res.status(400).json({
            message: "Input Harus Berupa Angka"
        })
    } else if (!name.match(/^[a-zA-Z ._-]*$/) || !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]*$/)) {
        return res.status(400).json({
            message: "Input NAMA dan EMAIL Harus Berupa Huruf"
        })
    }
    customersModel.update((req.body))
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Diperbaruhi"
    })   
}


module.exports = customersController