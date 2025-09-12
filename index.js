// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const router = express.Router();

// mongoose.connect('mongodb://127.0.0.1:27017/geeksforgeeks', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // User model
// const User = mongoose.model('User', {
//     name: { type: String },
//     age: { type: Number }
// });


// // Using async/await for queries
// (async () => {
//     try {
//         // Only one parameter [query/condition]
//         // Find all documents that match the condition name='Punit'
//         const docs1 = await User.find({ name: 'Punit' });
//         console.log("First function call:", docs1);

//         // Only Two parameters [condition, query projection]
//         // Here age: 0 means don't include age field in result
//         const docs2 = await User.find({ name: 'Punit' },{age:0});
//         console.log("Second function call:", docs2);

//         // All three parameters [condition, query projection, general query options]
//         // Fetch first two records whose age >= 10
//         // Second parameter is null i.e. no projections
//         // Third parameter is limit: 2 i.e. fetch only first 2 records
//         const docs3 = await User.find({ age: { $gte: 10 } }).limit(2);
//         console.log("Third function call:", docs3);
//     } catch (err) {
//         console.error("Error:", err);
//     }
// })();