const menuModel = require("../models/menuModel")

const menuController = {}

// MELIHAT DATABASE
menuController.getAll = (req,res) => {
    menuModel.getAll((err,rows) => {
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

menuController.getId = (req,res) => {
    menuModel.getId(req.params.id, (err,rows) => {
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

// UNTUK MENAMBAHKAN DATA
menuController.create = (req,res) => {
    const price = req.body.price
    const item = req.body.item

    if (!item || !price) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!Number(price)) {
        return res.status(400).json({
            message: "Input Harus Berupa Angka"
        })
    } else if (!item.match(/^[a-zA-Z ._-]*$/) ) {
        return res.status(400).json({
            message: "Input Harus Berupa Huruf"
        })
    }

    menuModel.create(req.body)
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Ditambahkan"
    })   
            
}

// MENGHAPUS DATA
menuController.delete = (req,res) => {
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
    menuModel.delete((req.body))
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Dihapus"
    })   
    
           
}

// MERUBAH DATA
menuController.update = (req,res) => {
    const id = req.body.id
    const price = req.body.price
    const item = req.body.item

    if (!id || !item || !price) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!Number(price) || !Number(id) ) {
        return res.status(400).json({
            message: "Input Harus Berupa Angka"
        })
    } else if (!item.match(/^[a-zA-Z ._-]*$/) ) {
        return res.status(400).json({
            message: "Input Harus Berupa Huruf"
        })
    }
    menuModel.update((req.body))
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Diperbaruhi"
    })   
    
    
}


module.exports = menuController