const db = require('../config/database');
const { blogQueries } = require('../sqlqueries/sqlquery');

const Blog = {
    addArticle: async (data, callback) => {
        const sql = blogQueries.addArticle;
        try {
            let con = await db.connect();
			con.query("START TRANSACTION");                     
            let result = await con.query(sql, [data.title, data.description, data.image, data.category_id])
                .then(res=>res[0].insertId)
                .catch(err=>{console.error(`Error(addArticle): ${err.sqlMessage}`);return false;});
            if(!result){
                con.query("ROLLBACK");
                con.end();
                callback(new Error('No rows affected'));
            }
            con.query("COMMIT");
            con.end();
            callback(null, result);
        } catch (error) {
            console.error("Error(addArticle):", error);
            callback(error, null);
        }
    },

    getCategories: async (callback) => {
        const sql = blogQueries.getCategoriesQuery;
        try {
            let con = await db.connect();
            let result = await con.query(sql)
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getCategories): ${err.sqlMessage}`);return false;});
            con.end();
            result = result?result:[];
            callback(null, result);
        } catch (error) {
            console.error("Error(getCategories):", error);
            callback(error, null);
        }
    },

    getAllArticles: async (callback) => {
        const sql = blogQueries.getAllArticles;
        try {
            let con = await db.connect();
            let result = await con.query(sql)
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getAllArticles): ${err.sqlMessage}`);return false;});
            con.end();
            result = result?result:[];
            callback(null, result);
        } catch (error) {
            console.error("Error(getAllArticles):", error);
            callback(error, null);
        }
    },

    getAllArticlesByCategoryId: async (category_id, callback) => {
        const sql = blogQueries.getArticlesByCategoryId;
        try {
            let con = await db.connect();
            let result = await con.query(sql, category_id)
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getAllArticlesByCategoryId): ${err.sqlMessage}`);return false;});
            con.end();
            result = result?result:[];
            callback(null, result);
        } catch (error) {
            console.error("Error(getAllArticlesByCategoryId):", error);
            callback(error, null);
        }
    },

    getArticleById: async (id, callback) => {
        const sql = blogQueries.getArticleById;
        try {
            let con = await db.connect();
            let result = await con.query(sql, [id])
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(getArticleById): ${err.sqlMessage}`);return false;});
            con.end();
            callback(null, result);
        } catch (error) {
            console.error("Error(getArticleById):", error);
            callback(error, null);
        }
    },

    deleteArticle: async (id, callback) => {
        const sql = blogQueries.deleteArticle;
        try {
            let con = await db.connect();
			con.query("START TRANSACTION");
            let result = await con.query(sql, [id])
                .then(res=>res[0])
                .catch(err=>{console.error(`Error(deleteArticle): ${err.sqlMessage}`);return false;});
            if(!result){
                con.query("ROLLBACK");
                con.end();
                callback(new Error('Error while delete'));
            }
            con.query("COMMIT");
            con.end();
            callback(null);
        } catch (error) {
            console.error("Error(deleteArticle):", error);
            callback(error);
        }
    }
};

module.exports = Blog;
