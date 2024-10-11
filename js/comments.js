 // Load comments from local storage
 const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    displayComments(comments);
};

// Display comments
const displayComments = (comments) => {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Clear the existing comments
    comments.forEach((comment) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-box');
        commentDiv.innerHTML = `<strong>${comment.author}</strong>: ${comment.comment} <em>(${comment.date})</em>`;
        commentsContainer.appendChild(commentDiv);
    });
};

// Handle form submission
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    const author = document.getElementById('author').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const date = new Date().toISOString().split('T')[0];

    // Create a new comment object
    const newComment = { author, comment, date };
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(newComment); // Add the new comment to the array
    localStorage.setItem('comments', JSON.stringify(comments)); // Save back to local storage

    displayComments(comments); // Display updated comments
    document.getElementById('commentForm').reset(); // Reset the form
});

// Load comments on page load
window.onload = loadComments; // Call the function to load comments















//    // Your web app's Firebase configuration
//    const firebaseConfig = {
//     apiKey: "AIzaSyCNoxjvlgVm2s8Uh3bqN2MMqKjvlebXW-I",
//     authDomain: "comments-17702.firebaseapp.com",
//     projectId: "comments-17702",
//     storageBucket: "comments-17702.appspot.com",
//     messagingSenderId: "154506188384",
//     appId: "1:154506188384:web:8fadd9d644e7ef0c381505",
//     measurementId: "G-BEHXPJ8CQ4"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore(app);

// // Function to add a comment to Firestore
// const addCommentToFirestore = async (author, comment) => {
//     try {
//         await db.collection("comments").add({
//             author: author,
//             comment: comment,
//             date: new Date().toISOString()
//         });
//         loadCommentsFromFirestore(); // Load updated comments
//     } catch (e) {
//         console.error("Error adding comment: ", e);
//     }
// };

// // Load comments from Firestore
// const loadCommentsFromFirestore = async () => {
//     const querySnapshot = await db.collection("comments").get();
//     const comments = [];
//     querySnapshot.forEach((doc) => {
//         comments.push({ id: doc.id, ...doc.data() });
//     });
//     displayComments(comments);
// };

// // Display comments
// const displayComments = (comments) => {
//     const commentsContainer = document.getElementById('commentsContainer');
//     commentsContainer.innerHTML = ''; // Clear existing comments
//     comments.forEach((comment) => {
//         const commentDiv = document.createElement('div');
//         commentDiv.classList.add('comment-box');
//         commentDiv.innerHTML = `<strong>${comment.author}</strong>: ${comment.comment} <em>(${new Date(comment.date).toLocaleDateString()})</em>`;
//         commentsContainer.appendChild(commentDiv);
//     });
// };

// // Handle form submission
// document.getElementById('commentForm').addEventListener('submit', function(e) {
//     e.preventDefault(); // Prevent default form submission
//     const author = document.getElementById('author').value.trim();
//     const comment = document.getElementById('comment').value.trim();
    
//     // Add the comment to Firestore
//     addCommentToFirestore(author, comment);

//     // Reset the form
//     document.getElementById('commentForm').reset();
// });

// // Load comments on page load
// window.onload = loadCommentsFromFirestore; // Call the function to load comments