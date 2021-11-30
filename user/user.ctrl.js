const { db } = require('../constants/constants');

const department = async function (req, res) {
    console.log('/user/department');
    let { department } = req.query;
    console.log(department)
    SELECT_department_sql = 'SELECT idx, name FROM `departments` WHERE `idx` > 0 AND ( name LIKE ? )';
    SELECT_department_sql_params = ['%'+department+'%'];

    let connection = await db.getConnection();
    let [depts, fields] = await connection.query(SELECT_department_sql, SELECT_department_sql_params);
    await connection.release();
    
    for (let d of depts) {
        if (d.idx >= 30000) d.name += " (대학원)";
    }

    res.send(depts)
}

module.exports = {
    department
}