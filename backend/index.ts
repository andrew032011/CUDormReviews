import admin from 'firebase-admin';
import express from 'express';

const serviceAccount = require("../backend/service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

app.use(express.json());

type Review = {
    cleanliness: number;
    convenience: number;
    lounges: number;
    noise: number;
    quality: number;
    social: number;
    year: number;
    review: string;
}

type ReviewWithID = {
    cleanliness: number;
    convenience: number;
    lounges: number;
    noise: number;
    quality: number;
    social: number;
    year: number;
    review: string;
    id: string;
}


// Route parameter dorm specifies which dorm review is for
app.post('/createReview/:dorm', async function (req, res) {
    const review: Review = { cleanliness: req.body.cleanliness, convenience: req.body.convenience, lounges: req.body.lounges, noise: req.body.noise, quality: req.body.quality, social: req.body.social, year: req.body.year, review: req.body.review,};
    const dorm = req.params.dorm;
    const postDoc = db.collection(dorm).doc();
    await postDoc.set(review);
    res.send(postDoc.id);
});

// Route parameter dorm specifies which dorm's reviews to get
app.get('/getReviews/:dorm', async (req, res) => {
    const reviewsSnapshot = await db.collection(req.params.dorm).get();
    const allReviewsDoc = reviewsSnapshot.docs;
    const reviews: ReviewWithID[] = []
    for(let doc of allReviewsDoc) {
      const review: ReviewWithID = doc.data() as ReviewWithID;
      review.id = doc.id;
      reviews.push(review);
    }
    res.send(reviews)
});

// Update a dorm's review.  This will be used for people who are authenticated who want to edit their review
// Takes in two parameters, the dorm (used to get the specific collection) and the id of the review within that dorm
app.post('/updateReview/:dorm/:id', async function (req, res) {
  const newReview: Review = req.body;
  const dorm: string = req.params.dorm;
  const id: string = req.params.id;
  await db.collection(dorm).doc(id).update(newReview);
  res.send("updated " + id);
});

app.listen(8080, function () {
  console.log('server started');
})

