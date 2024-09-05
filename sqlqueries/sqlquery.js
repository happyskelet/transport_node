const transportQueries = {
    addTransport: `INSERT INTO transports (name, description, price, image) VALUES (?, ?, ?, ?);`,
    getAllTransports: `SELECT * FROM transports`,
    getAllActiveTransports: `SELECT * FROM transports WHERE active = true;`,
    getTransportById: `SELECT * FROM transports WHERE id = ?;`,
    updateTransport: `UPDATE transports SET name = ?, description = ?, price = ?, image = ?, active = ? WHERE id = ?;`,
    updateActive: `UPDATE transports SET active = ? WHERE id = ?;`,
};

const partsQueries = {
    addPart: `INSERT INTO parts (name, description, price, image) VALUES (?, ?, ?, ?)`,
    getAllParts: `SELECT * FROM parts`,
    getPartById: `SELECT * FROM parts WHERE id = ?`,
    updatePart: `UPDATE parts SET name = ?, description = ?, price = ?, image = ? WHERE id = ?`,
};

const blogQueries = {
    addArticle: `INSERT INTO blog (title, description, image, category_id) VALUES (?, ?, ?, ?)`,
    getAllArticles: `SELECT 
        b.*, c.name category_name
        FROM blog b 
        LEFT JOIN category c 
        ON b.category_id = c.id`,
    getArticlesByCategoryId: `SELECT 
        b.*, c.name category_name
        FROM blog b 
        LEFT JOIN category c 
        ON b.category_id = c.id 
        WHERE b.category_id = ?`,
    getCategoriesQuery: `SELECT * FROM category`,
    getArticleById: `SELECT * FROM blog WHERE id = ?`,
    deleteArticle: `DELETE FROM blog WHERE id = ?`,
};

module.exports = {
    transportQueries,
    partsQueries,
    blogQueries,
};
