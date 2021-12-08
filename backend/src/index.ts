//import admin from 'firebase-admin';
import express from 'express';
import cors from "cors";
import path from "path";
//import { db } from '../firebase-config';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config();

const serviceAccountPath = './service-account.json';

const hydrateServiceAccount = (
  serviceAccountPath: string
): admin.ServiceAccount => {
  const serviceAccount = JSON.parse(
    readFileSync(serviceAccountPath).toString()
  );
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  return { ...serviceAccount, privateKey };
};

admin.initializeApp({
  credential: admin.credential.cert(hydrateServiceAccount(serviceAccountPath)),
});

const db = admin.firestore();
//const serviceAccount = require("../service-account.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const host = "http://mighty-falls-39041.herokuapp.com"

//const db = admin.firestore();

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(express.json());

type ReviewWithID = {
    cleanliness: number;
    convenience: number;
    lounges: number;
    noise: number;
    quality: number;
    social: number;
    year: number;
    review: string;
    userID: string;
    postID: string;
}


// Route parameter dorm specifies which dorm review is for
app.post(`${host}/createReview/:dorm`, async function (req, res) {
    const review: ReviewWithID = { cleanliness: req.body.cleanliness, convenience: req.body.convenience, lounges: req.body.lounges, noise: req.body.noise, quality: req.body.quality, social: req.body.social, year: req.body.year, review: req.body.review, userID: req.body.userID, postID: "null"};
    const dorm = req.params.dorm;
    const postDoc = db.collection(dorm).doc();
    await postDoc.set(review);
    res.send(postDoc.id);
});

// Route parameter dorm specifies which dorm's reviews to get
app.get(`${host}/getReviews/:dorm`, async (req, res) => {
    const reviewsSnapshot = await db.collection(req.params.dorm).get();
    const allReviewsDoc = reviewsSnapshot.docs;
    const reviews: ReviewWithID[] = []
    for(let doc of allReviewsDoc) {
      const review: ReviewWithID = doc.data() as ReviewWithID;
      review.postID = doc.id;
      reviews.push(review);
    }
    res.send(reviews)
});

// Update a dorm's review.  This will be used for people who are authenticated who want to edit their review
// Takes in two parameters, the dorm (used to get the specific collection) and the id of the review within that dorm
app.post(`${host}/updateReview/:dorm/:id`, async function (req, res) {
  const newReview: ReviewWithID = req.body;
  const dorm: string = req.params.dorm;
  const id: string = req.params.id;
  await db.collection(dorm).doc(id).update(newReview);
  res.send("updated " + id);
});

app.delete(`${host}/deleteReview/:dorm/:id`, async (req, res) => {
  const dorm: string = req.params.dorm;
  const id: string = req.params.id;
  await db.collection(dorm).doc(id).delete();
  res.send('Review deleted!');
});

app.listen(process.env.PORT || 8080, function () {
  console.log('server started');
})

