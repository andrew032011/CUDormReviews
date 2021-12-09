"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import admin from 'firebase-admin';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
//import { db } from '../firebase-config';
const admin = __importStar(require("firebase-admin"));
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const serviceAccountPath = './service-account.json';
const hydrateServiceAccount = (serviceAccountPath) => {
    const serviceAccount = JSON.parse((0, fs_1.readFileSync)(serviceAccountPath).toString());
    console.log(serviceAccount);
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
const host = "https://mighty-falls-39041.herokuapp.com";
//const db = admin.firestore();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../frontend/build")));
app.use(express_1.default.json());
// Route parameter dorm specifies which dorm review is for
app.post(`${host}/createReview/:dorm`, async function (req, res) {
    const review = { cleanliness: req.body.cleanliness, convenience: req.body.convenience, lounges: req.body.lounges, noise: req.body.noise, quality: req.body.quality, social: req.body.social, year: req.body.year, review: req.body.review, userID: req.body.userID, postID: "null" };
    const dorm = req.params.dorm;
    const postDoc = db.collection(dorm).doc();
    await postDoc.set(review);
    res.send(postDoc.id);
});
// Route parameter dorm specifies which dorm's reviews to get
app.get(`${host}/getReviews/:dorm`, async (req, res) => {
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
app.post(`${host}/updateReview/:dorm/:id`, async function (req, res) {
    const newReview = req.body;
    const dorm = req.params.dorm;
    const id = req.params.id;
    await db.collection(dorm).doc(id).update(newReview);
    res.send("updated " + id);
});
app.delete(`${host}/deleteReview/:dorm/:id`, async (req, res) => {
    const dorm = req.params.dorm;
    const id = req.params.id;
    await db.collection(dorm).doc(id).delete();
    res.send('Review deleted!');
});
app.listen(process.env.PORT || 8080, function () {
    console.log('server started');
});
