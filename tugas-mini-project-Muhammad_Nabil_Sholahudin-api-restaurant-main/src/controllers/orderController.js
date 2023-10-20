const customersModel = require("../models/customersModel")
const menuModel = require("../models/menuModel")
const orderModel = require("../models/orderModel")

const orderController = {}

// MELIHAT DATABASE
orderController.getAll = (req,res) => {
    orderModel.getId((dataOrder) => {   
        const data2 = []
        const data1 = {};
        dataOrder.forEach(data => {
            const { name, item, price, qty, order_date } = data;
            if (!data1[name]) {
                data1[name] = {
                    customerName: name,
                    orders: [],
                    totalOrder: 0,
                    order_date
                };
            }
            data1[name].orders.push({ item, price, qty });
            data1[name].totalOrder += price * qty;
            });
          
         
        for (const name in data1) {
            data2.push(data1[name]);
        }

        
        res.json({
            status: "OK",
            data: data2
        })
    }) 
}


// UNTUK MENAMBAHKAN DATA
orderController.create = (req,res) => {
    const { customerId, items } = req.body;
    customersModel.getById(customerId, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Terjadi kesalahan dalam MODEL CUSTOMER"
            }); 
        }

        if (!data) {
            return res.json({
                message: "Tidak Ada data Customer dengan ID"
            });
        }
        const menuItem = items.map((d) => d.menu)
        const qtyByMenu = items.map((d) => d.qty)
        
        menuModel.select(menuItem,(err,menuData) => {
            if (err) {
                return res.json({
                    message: "Terjadi Kesalahan Dalam MODEL MENU"
                })
            }
            if (!menuData) {
                return res.json({
                    message: "Tidak Ada data MENU"
                });
            }
        
            const data1 = tambahQty(menuData,qtyByMenu)

            const toInsertData = []
            for (let menu of data1) {
                toInsertData.push({
                    customer_id: customerId,
                    menu_id: menu.id,
                    qty: menu.qty
                })
            }
            

            orderModel.create(toInsertData,(orderErr,orderData) => {
                if (orderErr) {
                    res.status(500).json({
                        message: "EROR"
                    })
                } else {
                    orderModel.getDate(customerId,(rows) => {
                        
                        const totalOrder = items.reduce((total, item) => total + item.price * item.qty, 0);
                        
                        res.json({
                            status: "OK",
                            message: "Data Berhasil Ditambahkan !",
                            orders: items,
                            totalOrder,
                            orderDate: rows.order_date
                           
                        })
                    })
                }
        
            })  
            
        })

        
        
    })        

}  


function tambahQty(data, qty) {

    return data.map((obj, index) => ({
        ...obj,
        qty: qty[index],
    }));
}



module.exports = orderController