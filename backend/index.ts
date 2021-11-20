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

// BEGIN HARDCODED DATA
type DormData = {
  singles: boolean;
  doubles: boolean;
  triples: boolean;
  quads: boolean;
  suites: boolean;
  pods: boolean;
  corridors: boolean;
  residents: number;
  ac: boolean;
  elevators: boolean;
  dining: boolean;
  housingWebsite: string;
  picLink: string;
  name: string;
  location: string;
}

const mews: DormData = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: false,
  pods: true,
  corridors: false,
  residents: 260,
  ac: true,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/first-year-undergraduates/residence-halls/mews-hall",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2019-09/Mews_1.png?h=4380f786&itok=KFIPyz0k",
  name: "Mews Hall",
  location: "North Campus"
}

const ganedago: DormData = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: true,
  pods: false,
  corridors: false,
  residents: 520,
  ac: true,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/first-year-undergraduates/residence-halls/ganedago-hall",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2020-10/SophSiteRendering.JPG?h=473ee7f7&itok=A__s8kaO",
  name: "Ganędagǫ: Hall",
  location: "North Campus"
}

const donlon: DormData = {
  singles: true,
  doubles: true,
  triples: false,
  quads: true,
  suites: false,
  pods: false,
  corridors: true,
  residents: 450,
  ac: false,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/first-year-undergraduates/residence-halls/mary-donlon-hall",
  picLink: "",
  name: "Mary Donlon Hall",
  location: "North Campus"
}

const becker: DormData = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: true,
  pods: false,
  corridors: true,
  residents: 350,
  ac: true,
  elevators: true,
  dining: true,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/upperlevel-undergraduates/west-campus-house-system/carl-becker-house",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2019-11/Screen%20Shot%202019-11-08%20at%2011.22.01%20AM.png?h=76e9374a&itok=VerXzdGa",
  name: "Carl Becker House",
  location: "West Campus"
}

const cascadilla: DormData = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: false,
  pods: false,
  corridors: true,
  residents: 366,
  ac: false,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/upperlevel-undergraduates/residence-halls/cascadilla-hall",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2019-11/Screen%20Shot%202019-11-08%20at%2011.27.56%20AM.png?h=5b16f0df&itok=TklGYZ07",
  name: "Cascadilla Hall",
  location: "South Campus"
}

// For whatever reason i need to do this to avoid compile errors since the variables are not yet being used
console.log(mews);
console.log(ganedago);
console.log(donlon);
console.log(becker);
console.log(cascadilla);

app.listen(8080, function () {
  console.log('server started');
})

