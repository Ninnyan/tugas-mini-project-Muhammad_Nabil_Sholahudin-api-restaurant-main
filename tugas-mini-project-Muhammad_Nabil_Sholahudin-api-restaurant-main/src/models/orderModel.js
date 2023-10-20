const db = require("../../db/config")

const orderModel = {}
orderModel.getAll = (callback) => {
    return db.all(`SELECT menu.item,menu.price,orders.qty FROM menu INNER JOIN orders ON menu.id = orders.menu_id INNER JOIN customer ON customer.id = orders.customer_id WHERE customer_id = 1`,(err,rows) => {
        if(err) {
            callback(null,err)
        } else {
            callback(rows,null)

        }
    })
}

// lanjutkan disini
orderModel.create = (data,callback) => {
    const insertStatement = db.prepare(`INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES (?, ?, ?,date('now'))`);

    db.serialize(() => {
        db.run('BEGIN TRANSACTION'); 

        data.forEach((item) => {
            insertStatement.run(item.customer_id, item.menu_id, item.qty);
        });

        db.run('COMMIT', (err) => {
            if (err) {
                callback(err, null); 
            } else {
                callback(null, 'Data berhasil dimasukkan'); 
            }
        }); 
    });

    insertStatement.finalize(); 
}

orderModel.getDate = (customerId,callback) => {
    db.get(`SELECT order_date FROM orders WHERE customer_id = '${customerId}'`,(err,rows) => {
        if(err) {
            callback(null, err)
        } 
            callback(rows,null)
    })
}


orderModel.getId = (callback) => {
    return db.all(`SELECT name,item,price,qty,order_date FROM menu INNER JOIN orders ON menu.id = orders.menu_id INNER JOIN customer ON customer.id = orders.customer_id WHERE customer_id = customer.id`,(err,rows) => {
        if(err) {
            callback(null,err)
        } else {
            callback(rows,null)

        }
    })
}




module.exports = orderModel