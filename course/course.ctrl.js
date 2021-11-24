const { db } = require('../constants/constants');
const { int_to_day, int_to_building } = require('../functions/function');

const data = async function(req, res) {
    console.log('/course/data')
    let { department } = req.query;
    // department = 8007;
    let SELECT_course_sql = 'SELECT c.subject,\
                        t1.name AS course_type1, t2.name AS course_type2,\
                        d.name AS department_name,\
                        s.number, s.name AS subject_name, s.credit, s.credit_planned,\
                        t.day, t.start, t.end,\
                        p.name AS professor,\
                        l.name AS location_name, l.building, l.room, l.room_detail,\
                        cd.type AS certification_type, cd.name AS certification_name\
                    FROM `courses` AS c\
                    JOIN `course_type1_details` AS t1 ON c.type1=t1.idx\
                    JOIN `course_type2_details` AS t2 ON c.type2=t2.idx\
                    JOIN `departments` AS d ON c.department=d.idx\
                    JOIN `subjects` AS s ON c.subject=s.idx\
                    JOIN `timetables` AS t ON t.subject=s.idx\
                    JOIN `professors` AS p ON t.professor=p.idx\
                    JOIN `locations` AS l ON t.location=l.idx\
                    LEFT JOIN `certifications` AS ce ON s.idx=ce.subject\
                    LEFT JOIN `certification_details` AS cd ON ce.certification_detail=cd.idx\
                    WHERE c.department = ?';
                
    let SELECT_course_sql_params = [department];
    let connection = await db.getConnection();
    let [courses, fields] = await connection.query(SELECT_course_sql, SELECT_course_sql_params);
    await connection.release();

    refined_courses = {}

    for (let course of courses) {
        let { subject, course_type1:type1, course_type2:type2, department_name, number, subject_name, credit, credit_planned, day, start, end, professor, location_name, building, room, room_detail, certification_type: cert_type, certification_name: cert_name } = course;
        start = start.slice(0,5);
        end = end.slice(0,5);
        let b = await int_to_building(building);

        if (refined_courses[course.subject]) {
            if (!refined_courses[course.subject].professors.includes(professor)) {
                refined_courses[course.subject].professors.push(professor);
            }
            let len = refined_courses[course.subject].timetables.length + 1;
            
            let is_in = false;
            for (let timetable of refined_courses[course.subject].timetables) {
                let { day: t_day, start: t_start, end: t_end } = timetable;
                if (t_day==day) {
                    if (t_start==start) {
                        is_in = true;
                        break;
                    }
                    timetable.start = Number(t_start.slice(0,2)) > Number(start.slice(0,2)) ? start : t_start;
                    timetable.end = Number(t_end.slice(0,2)) < Number(end.slice(0,2)) ? end : t_end;
                    is_in = true;
                    break;
                }
            }
            if (!is_in)
                refined_courses[course.subject].timetables.push({ idx: len, day: day, start:start, end: end, loc: { location: b+" "+(building==0?"":("00"+building).slice(-2))+(room==0?"":room)+room_detail, name: location_name }});
            
            is_in = false;
            for (let course_type of refined_courses[course.subject].course_types) {
                let [tp1, tp2] = course_type;
                if (tp1==type1 && tp2==type2) {
                    is_in = true;
                    break;
                }
            }
            if (!is_in)
                refined_courses[course.subject].course_types.push([type1, type2]);
            
            is_in = false;
            let cert = cert_type!=null?cert_type + " " + cert_name:"";
            if (!refined_courses[course.subject].certifications.includes(cert)) {
                refined_courses[course.subject].certifications.push(cert);
            }
        } else {
            let len = Object.keys(refined_courses).length + 1;
            refined_courses[course.subject] = {
                idx: len,
                subject: subject,
                department_name: department_name,
                number: number,
                subject_name: subject_name,
                credit: credit,
                credit_planned: credit_planned,
                professors: [professor],
                timetables: [{ idx: 1, day: day, start:start, end: end, loc: { location: b+" "+(building==0?"":("00"+building).slice(-2))+(room==0?"":room)+room_detail, name: location_name }}],
                course_types: [[type1, type2]],
                certifications: [cert_type!=null?cert_type + " " + cert_name:""]
            };
        }
    }
    for (let course in refined_courses) {
        refined_courses[course].professors = refined_courses[course].professors.join(", ");
        refined_courses[course].certifications = refined_courses[course].certifications.join(", ");
        refined_courses[course].timetables.sort((a, b) => {
            if (a.day === b.day) {
                return b.start - a.start;
            }
            return a.day - b.day;
        })
        for (let timetable of refined_courses[course].timetables) {
            timetable.day = await int_to_day(timetable.day);
        }
    }
    // refined_courses.sort();
    // console.log(refined_courses)
    return res.status(200).send(refined_courses);
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