import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  /*Example 2:
   * Object Destructuring
   * Purpose: A convenient way to extract multiple properties from an object
   * and create individual variables in a single line of code.
   * This makes the code cleaner and more readable.
   */
  const getStudent = async () => {
    const student = {
      name: "Peter",
      age: 51,
      email: "peter@gmail.com",
      favCourse: {
        code: "BTI425",
        coursename: "Web Programming #3",
        prof: { fullname: "David", contact: "david@seneca.ca" }
      }
    };

    // Traditional way: Accessing object properties one by one
    // This method requires repeating the object name each time
    console.log(`student.name: ${student.name}`);
    console.log(`age: ${student.age}`);
    console.log(`email: ${student.email}`);

    // Modern way: Object destructuring
    // Extract multiple properties at once and create matching variable names
    // This creates variables: name, age, email, and favCourse
    const { name, age, email, favCourse } = student;
    console.log(`Destructured student ${typeof student}: ${student}`);
    console.log(`name: ${name}`);
    console.log(`age: ${age}`);
    console.log(`email: ${email}`);

    // Nested destructuring: Extracting properties from the nested favCourse object
    // Creates variables: code, coursename, and prof
    const { code, coursename, prof } = favCourse;
    console.log(`code: ${code}`);
    console.log(`coursename: ${coursename}`);

    // Further nested destructuring: Extracting from the prof object
    // Creates variables: fullname and contact
    const { fullname, contact } = prof;
    console.log(`fullname: ${fullname}`);
    console.log(`contact: ${contact}`);
  };

  console.log('STARTING DESTRUCTURING DEMO');
  (async () => {
    await getStudent();
    console.log('DESTRUCTURING DEMO COMPLETE');
  })();
}