//load express module
const express = require('express');
const app = express();

app.use(express.json());

const students = [
    { name: "Patrick O'Connor", address: "11 Woodstown Abbey", class: 3, id: 1},
    { name: "Damien Hornegg", address: "Paris, France", class: 1, id: 2},
    { name: "Shane Gannon", address: "Tallaght, Dublin 24", class: 3, id: 3},

];

const courses = [
    { name: "Science", description: "Sciency things", id: 1},
    { name: "Computers", description: "Learn to type", id: 2},
    { name: "Cooking", description: "Why not", id: 3},

];

const grades = [
    {courseid: 1, studentid: 1, grade: 90},
    {courseid: 1, studentid: 2, grade: 80},
    {courseid: 1, studentid: 3, grade: 75},
    {courseid: 2, studentid: 2, grade: 68},
    {courseid: 2, studentid: 3, grade: 79},
    {courseid: 3, studentid: 1, grade: 44},
    {courseid: 3, studentid: 3, grade: 37},


];

app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/grades', (req, res) => {
    res.send(grades);
});



app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        //400 bad request
        res.status(400).send('name is required and has to be atleast 3 characters');
        return;
    }
    const course = {
        
        name: req.body.name,
        description: req.body.description,
        id: courses.length + 1
    };
    courses.push(course);
    res.send(course);
});

app.post('/api/students', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        //400 bad request
        res.status(400).send('name is required and has to be atleast 3 characters');
        return;
    }
    const student = {
        name: req.body.name,
        address: req.body.address,
        class: req.body.class,
        id: students.length + 1
    };

    students.push(student);
    res.send(student);
});

app.post('/api/grades', (req, res) => {
    
    const grade = {
        courseid: req.body.courseid,
        studentid: req.body.studentid,
        grade: req.body.grade,
    };

    students.push(grade);
    res.send(grade);
});

app.put('/api/courses/:id', (req, res) => {
    //find course
    //if it doesnt exist, 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('The course was not found');
        return;
    }

    
    course.name = req.body.name;
    course.description = req.body.description;
    res.send(course);
    

});

app.put('/api/students/:id', (req, res) => {
    //find course
    //if it doesnt exist, 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student)
    {
        res.status(404).send('The student was not found');
        return;
    }

    student.name = req.body.name;
    student.address = req.body.address;
    student.class = req.body.class;
    res.send(student);

});

app.put('/api/grades/:courseid/:studentid', (req, res) => {
    //find course
    //if it doesnt exist, 404
    const grade = grades.find((c => c.courseid === parseInt(req.params.courseid)) && (c => c.studentid == parseInt(req.params.studentid)));
    if(!grade)
    {
        res.status(404).send('The grade was not found');
        return;
    }

    grade.courseid = req.body.courseid;
    grade.studentid = req.body.studentid;
    grade.grade = req.body.grade;
    res.send(grade);

});

app.delete('/api/courses/:id', (req, res) => {
    //find course, if not there 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('The course was not found');
        return;
    }

    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

app.delete('/api/students/:id', (req, res) => {
    //find course, if not there 404
    const student = student.find(c => c.id === parseInt(req.params.id));
    if(!student)
    {
        res.status(404).send('The student was not found');
        return;
    }

    //delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send(student);
});

app.delete('/api/grades/:courseid/:studentid', (req, res) => {
    //find course, if not there 404
    const grade = grades.find((c => c.courseid === parseInt(req.params.courseid)) && (c => c.studentid == parseInt(req.params.studentid)));
    if(!grade)
    {
        res.status(404).send('The grade was not found');
        return;
    }

    //delete
    const index = grades.indexOf(grade);
    grades.splice(index, 1);

    res.send(grade);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('The course was not found');
        return;
    }
    res.send(course);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student)
    {
        res.status(404).send('The student was not found');
        return;
    }
    res.send(student);
});

app.get('/api/grades/:courseid', (req, res) => {
    var grade = grades.filter(c => c.courseid === parseInt(req.params.courseid));
    if(!grade)
    {
        res.status(404).send('The grades was not found');
        return;
    }
    res.send(grade);
});
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));