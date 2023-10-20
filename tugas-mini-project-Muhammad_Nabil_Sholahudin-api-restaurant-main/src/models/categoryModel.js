const db = require("../../db/config")

const categoryModel = {}

categoryModel.getAll = (callback) => {
    return db.all("SELECT * FROM categories",(err,rows) => {
        if(err) {
            callback(err,null)
        } else {
            callback(null,rows)
        }
    })
}

categoryModel.getId = (data,callback) => {
    return db.get(`SELECT * FROM categories WHERE id = ${data} `,(err,rows) => {
        if(err) {
            callback(err,null)
        } else {
            callback(null,rows)
        }
    })
}

categoryModel.create = (data) => {
    return db.run(`INSERT INTO categories (name) VALUES ('${data.name}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

categoryModel.delete = (data) => {
    return db.run(`DELETE FROM categories WHERE id = ${data.id}`, (err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

categoryModel.update = (data) => {
    return db.run(`UPDATE categories SET name = '${data.name}',updated_at = datetime('now') WHERE id = ${data.id}`, (err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }   
    })
}

module.exports = categoryModel