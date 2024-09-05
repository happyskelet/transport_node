const db = require('../config/database');
const { transportQueries } = require('../sqlqueries/sqlquery');

const Transport = {
    addTransport: async (data, callback) => {
        const sql = transportQueries.addTransport;   
        try {
            let con = await db.connect();
			con.query("START TRANSACTION");                     
            let result = await con.query(sql, [data.name, data.description, data.price, data.image])
                .then(res=>res[0].insertId)
                .catch(err=>{console.error(`Error(addTransport): ${err.sqlMessage}`);return false;});
            if(!result){
                con.query("ROLLBACK");
                con.end();
                callback(new Error('No rows affected'));
            }
            con.query("COMMIT");
            con.end();
            callback(null, result);            
        } catch (error) {
            console.error(`Error(addTransport):\n ${error}`);
            callback(error, null);
        }
    },

    getAllTransports: async (callback) => {        
        const sql = transportQueries.getAllTransports;
        try {
            let con = await db.connect();
            let result = await con.query(sql)
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getAllTransports): ${err.sqlMessage}`);return false;});
            con.end();
            result = result?result:[];
            callback(null, result);
        } catch (error) {
            console.error(`Error(getAllTransports):\n ${error}`);
            callback(error, null);
        }
    },

    getAllActiveTransports: async (callback) => {
        const sql = transportQueries.getAllActiveTransports;
        try {
            let con = await db.connect();
            let result = await con.query(sql)
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getAllActiveTransports): ${err.sqlMessage}`);return false;});
            con.end();
            result = result?result:[];
            callback(null, result);
        } catch (error) {
            console.error(`Error(getAllActiveTransports):\n ${error}`);
            callback(error, null);
        }
    },

    getTransportById: async (id, callback) => {
        const sql = transportQueries.getTransportById;
        try {
            let con = await db.connect();
            let result = await con.query(sql, [id])
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getTransportById): ${err.sqlMessage}`);return false;});
            con.end();
            callback(null, result);
        } catch (error) {
            console.error(`Error(getTransportById):\n ${error}`);
            callback(error, null);
        }
    },

    updateTransport: async (data, callback) => {
        const sql = transportQueries.updateTransport;
        try {
            let con = await db.connect();
			con.query("START TRANSACTION");    
            var result = await con.query(sql, [data.name, data.description, data.price, data.image, data.active, data.id])
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(updateTransport): ${err.sqlMessage}`);return false;});            
            if(!result) {
                con.query("ROLLBACK");
                con.end();
                callback(new Error('Error while update'));
            }
            con.query("COMMIT");
            con.end();
            callback(null);
        } catch (error) {
            console.error(`Error(updateTransport):\n ${error}`);
            callback(error);
        }
    },

    updateActive: async (id, active, callback) => {
        const sql = transportQueries.updateActive;
        try {
            let con = await db.connect();
			con.query("START TRANSACTION");    
            var result = await con.query(sql, [active, id])
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(updateActive): ${err.sqlMessage}`);return false;});           
            if(!result) {
                con.query("ROLLBACK");
                con.end();
                callback(new Error('Error while update'));
            }
            con.query("COMMIT");
            con.end();
            callback(null);
        } catch (error) {
            console.error(`Error(updateActive):\n ${error}`);
            callback(error);
        }
    }
};

module.exports = Transport;