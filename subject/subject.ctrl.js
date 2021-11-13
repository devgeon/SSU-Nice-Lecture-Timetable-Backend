const { db } = require('../constants/constants');

const data = async function(req, res) {
    let data = req.body;
    try {
        data = data.json;
        data = JSON.parse(data);
    }
    catch(err) { console.log(err) }
    let connection = await db.getConnection();
    // console.log(data);
    let { course_number, regexp } = data;
    // console.log(course_number);
    for (i=1400;i<1408;i++) {
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

const page = (req, res) => {
    let body = `
    <form id='form' action='/subject/timetable' method='post'>
        <input type='text' name='json' id='json' maxLength='2500'>
        <input type='submit'>
    `;
    res.send(body);
}

module.exports = {
    data, page
}