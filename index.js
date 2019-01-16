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

app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/students', (req, res) => {
    res.send(students);
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
    const index = student.indexOf(student);
    students.splice(index, 1);

    res.send(student);
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
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));