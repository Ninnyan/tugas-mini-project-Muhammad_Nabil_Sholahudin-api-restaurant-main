const db = require("../../db/config")

const customersModel = {}
customersModel.getAll = (callback) => {
    return db.all("SELECT id,name,address,email FROM customer",(err,rows) => {
        if(err) {
            callback(err,null)
        } else {
            callback(null,rows)
        }
    })
}

customersModel.getId = (data,callback) => {
    return db.get(`SELECT id,name,address,email FROM customer WHERE id = ${data} `,(err,rows) => {
        if(err) {
            callback(err,null)
        } else {
            callback(null,rows)
        }
    })
}

// lanjutkan disini
customersModel.create = (data) => {
    return db.run(`INSERT INTO customer (name, address,email) VALUES ('${data.name}','${data.address}','${data.email}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

customersModel.delete = (data) => {
    return db.run(`DELETE FROM customer WHERE id = ${data.id}`, (err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

customersModel.update = (data) => {
    return db.run(`UPDATE customer SET name = '${data.name}', address = '${data.address}', email = '${data.email}', updated_at = datetime('now') WHERE id = ${data.id}`, (err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }   
    })
}


customersModel.getById = (customerId,callback) => {
    db.get(`SELECT * FROM customer WHERE id = ${customerId}`,(err,rows) => {
        if(err) {
            callback(err,null);
        } 
            callback(null,rows);

    });
}

module.exports = customersModel