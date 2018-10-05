const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connected to MongoDB...!', err));


// defined course schema
const courseSchema = new mongoose.Schema( {
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// create a class Course
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
  // create an object course
  const course = new Course({
    name: 'Angular Course',
    author: 'Kiet',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {

  // eq (equal)
  // ne (not equal)
  // gt (greeter than)
  // gte (greeter than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  // or
  // and

  // pagination
  const pageNumber = 2;
  const pageSize = 1;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course
    // starts with Kiet
    // .find({ author: /^Kiet/ }) // regular expression
    // Ends with Kiet
    // .find({ author: /Kiet$/i })
    // Contains Kiet
    // .find({ author: /.*Kiet.*/ })
    // .find()
    // .or([ { author: 'Kiet' }, { isPublished: true }])
    // .and([...])
    .find({ author: 'Kiet', isPublished: true })
    // .find({ price: { $gte: 10, $lts: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    .skip((pageNumber -1) * pageSize) //paging
    .limit(pageSize)
    .sort({ name: 1, tags: 1 })
    // .count()
    .select( {name: 1, tags: 1})
    ;
  console.log(courses);
}

// createCourse();
getCourses();


