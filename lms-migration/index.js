const { MongoClient } = require('mongodb');

const courses = require('./data/courses.json');
const users = require('./data/users.json');
const students = require('./data/students.json');

const url = 'mongodb://localhost:5001';
const dbName = 'lms';

const client = new MongoClient(url);

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    const user = db.collection('user');
    const student = db.collection('student');
    const course = db.collection('course');

    const deleteUsersPromise = await user.deleteMany({})
    const deleteStudentsPromise = await student.deleteMany({})
    const deleteCoursesPromise = await course.deleteMany({})

    const usersPromise = await user.insertMany(users)
    const studentsPromise = await student.insertMany(students)
    const coursesPromise = await course.insertMany(courses)

    Promise.all([deleteUsersPromise, deleteStudentsPromise, deleteCoursesPromise]).then(() => {
        Promise.all([usersPromise, studentsPromise, coursesPromise]).then(() =>
            console.log('Migrated successfully')
        )
    })

    return 'Migration Ends';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())