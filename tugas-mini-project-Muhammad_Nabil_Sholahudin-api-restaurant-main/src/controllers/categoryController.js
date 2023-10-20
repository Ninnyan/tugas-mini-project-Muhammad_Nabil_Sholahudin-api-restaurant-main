const categoryModel = require("../models/categoryModel")

const categoryController = {}

// MELIHAT DATABASE
categoryController.getAll = (req,res) => {

    categoryModel.getAll((err,rows) => {
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

categoryController.getId = (req,res) => {
    categoryModel.getId(req.params.id, (err,rows) => {
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

// MENAMBAHKAN DATA BARU
categoryController.create = (req,res) => {
    const name = req.body.name

    if (!name) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!name.match(/^[a-zA-Z ._-]*$/)) {
        return res.status(400).json({
            message: "Input NAME Harus Berupa Huruf"
        })
    } else {
        categoryModel.create(req.body)
        res.status(200).json({
            status : "OK",
            message : "Data Berhasil Ditambahkan"
        })   
    }
}

    

// MENGHAPUS DATA
categoryController.delete = (req,res) => {
    const id = req.body.id

    if (!id) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!Number(id)) {
        return res.status(400).json({
            message: "Input ID Harus Berupa Angka"
        })
    } 
    categoryModel.delete((req.body))
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Dihapus"
    })   
}

// MERUBAH DATA
categoryController.update = (req,res) => {
    const id = req.body.id
    const name = req.body.name

    if (!id || !name) {
        return res.status(400).json({
            message: "Input Invalid"
        })
    } else if (!Number(id) ) {
        return res.status(400).json({
            message: "Input ID Harus Berupa Angka"
        })
    } else if (!name.match(/^[a-zA-Z ._-]*$/) ) {
        return res.status(400).json({
            message: "Input NAME Harus Berupa Huruf"
        })
    }
    categoryModel.update((req.body))
    res.status(200).json({
        status : "OK",
        message : "Data Berhasil Diperbaruhi"
    })   
}


module.exports = categoryController