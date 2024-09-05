const db = require('../config/database');
const { partsQueries } = require('../sqlqueries/sqlquery');

const Parts = {
    addPart: async (data, callback) => {        
        const sql = partsQueries.addPart;
        try {
            let con = await db.connect();
			con.query("START TRANSACTION");                     
            let result = await con.query(sql, [data.name, data.description, data.price, data.image])
                .then(res=>res[0].insertId)
                .catch(err=>{console.error(`Error(addPart): ${err.sqlMessage}`);return false;});
            if(!result){
                con.query("ROLLBACK");
                con.end();
                callback(new Error('No rows affected'));
            }
            con.query("COMMIT");
            con.end();
            callback(null, result);
        } catch (error) {
            callback(error, null);
        }
    },

    getAllParts: async (callback) => {
        const sql = partsQueries.getAllParts;
        try {
            let con = await db.connect();
            let result = await con.query(sql)
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getAllParts): ${err.sqlMessage}`);return false;});
            con.end();
            result = result?result:[];
            callback(null, result);
        } catch (error) {            
            console.error("Error(getAllParts):", error);
            callback(error, null);
        }
    },

    getPartById: async (id, callback) => {
        const sql = partsQueries.getPartById;
        try {
            let con = await db.connect();
            let result = await con.query(sql, [id])
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getPartById): ${err.sqlMessage}`);return false;});
            con.end();
            callback(null, result);
        } catch (error) {
            console.error("Error(getPartById):", error);
            callback(error, null);
        }
    },

    updatePart: async (data, callback) => {
        const sql = partsQueries.updatePart;
        try {
            let con = await db.connect();
			con.query("START TRANSACTION");    
            var result = await con.query(sql, [data.name, data.description, data.price, data.image, data.id])
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(updatePart): ${err.sqlMessage}`);return false;});            
            if(!result) {
                con.query("ROLLBACK");
                con.end();
                callback(new Error('Error while update'));
            }
            con.query("COMMIT");
            con.end();
            callback(null);
        } catch (error) {
            console.error("Error(updatePart):", error);
            callback(error);
        }
    }
};

module.exports = Parts;
