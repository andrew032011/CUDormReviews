"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const serviceAccount = require("../service-account.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
const db = firebase_admin_1.default.firestore();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Route parameter dorm specifies which dorm review is for
app.post('/createReview/:dorm', async function (req, res) {
    const review = { cleanliness: req.body.cleanliness, convenience: req.body.convenience, lounges: req.body.lounges, noise: req.body.noise, quality: req.body.quality, social: req.body.social, year: req.body.year, review: req.body.review, userID: req.body.userID, postID: "null" };
    const dorm = req.params.dorm;
    const postDoc = db.collection(dorm).doc();
    await postDoc.set(review);
    res.send(postDoc.id);
});
// Route parameter dorm specifies which dorm's reviews to get
app.get('/getReviews/:dorm', async (req, res) => {
    const reviewsSnapshot = await db.collection(req.params.dorm).get();
    const allReviewsDoc = reviewsSnapshot.docs;
    const reviews = [];
    for (let doc of allReviewsDoc) {
        const review = doc.data();
        review.postID = doc.id;
        reviews.push(review);
    }
    res.send(reviews);
});
// Update a dorm's review.  This will be used for people who are authenticated who want to edit their review
// Takes in two parameters, the dorm (used to get the specific collection) and the id of the review within that dorm
app.post('/updateReview/:dorm/:id', async function (req, res) {
    const newReview = req.body;
    const dorm = req.params.dorm;
    const id = req.params.id;
    await db.collection(dorm).doc(id).update(newReview);
    res.send("updated " + id);
});
app.delete('/deleteReview/:dorm/:id', async (req, res) => {
    const dorm = req.params.dorm;
    const id = req.params.id;
    await db.collection(dorm).doc(id).delete();
    res.send('Review deleted!');
});
app.listen(8080, function () {
    console.log('server started');
});
