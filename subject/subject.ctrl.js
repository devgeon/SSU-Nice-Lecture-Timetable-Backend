const { db } = require('../constants/constants');

const data = async function(req, res) {
    let data = req.body;
    let connection = await db.getConnection();
    // console.log(data);
    for (i=0;i<201;i++) {
        let { course_number, regexp } = data; 
        console.log(course_number[i]);
        console.log(regexp[i]);
        regexp[i] = JSON.stringify(regexp[i]);
        let sql = 'INSERT INTO `subject` (number, timetable) VALUES (?, ?)';
        try {
            let [results] = await connection.query(sql, [course_number[i], regexp[i]]);
        } catch (err) {
            console.log(err)
        }
    }
    await connection.release();
    return res.status(200).send('OK');
}

module.exports = {
    data,
}