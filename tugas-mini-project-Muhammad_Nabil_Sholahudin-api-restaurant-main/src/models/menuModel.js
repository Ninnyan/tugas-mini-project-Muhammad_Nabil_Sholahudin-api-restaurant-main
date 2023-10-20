const db = require("../../db/config")

const menuModel = {}
menuModel.getAll = (callback) => {
    return db.all("SELECT id,item,price FROM menu ",(err,rows) => {
        if(err) {
            callback(err,null)
        } else {
            callback(null,rows)
        }
    })
}

menuModel.getId = (data,callback) => {
    return db.get(`SELECT id,item,price FROM menu WHERE id = ${data} `,(err,rows) => {
        if(err) {
            callback(err,null)
        } else {
            callback(null,rows)
        }
    })
}

// lanjutkan disini
menuModel.create = (data) => {
    return db.run(`INSERT INTO menu (item,price) VALUES ('${data.item}','${data.price}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

menuModel.delete = (data) => {
    return db.run(`DELETE FROM menu WHERE id = ${data.id}`, (err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

menuModel.update = (data) => {
    return db.run(`UPDATE menu SET item = '${data.item}', price = '${data.price}', updated_at = datetime('now') WHERE id = ${data.id} `, (err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }   
    })
}   

menuModel.select = (menuItem,callback) => {
    const data = menuItem.map(() => '?').join(', ');
    return db.all(`SELECT id,item,price FROM menu WHERE item IN (${data})`,menuItem,(err,rows) => {
        if(err) {
            callback (err,null)
        } 
            callback(null, rows)

        
    })
}



module.exports = menuModel