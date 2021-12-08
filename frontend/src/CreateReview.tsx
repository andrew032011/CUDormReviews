import { useState, ChangeEvent } from 'react';
import axios from "axios";
import styles from './createreview.module.css';
import { getAuth } from 'firebase/auth';
import { ReviewWithID } from './App';
// import ReviewButtonSet from './ReviewButtonSet';

type Prop = {
    dormName: string
    readonly reviews: ReviewWithID[];
    readonly setReviews: (t: ReviewWithID[]) => void;
}

const CreateReview = ({dormName, reviews, setReviews}: Prop) => {
    const [review, setReview] = useState('');
    const [year, setYear] = useState('');
    const [social, setSocial] = useState("1");
    const [convenience, setConvenience] = useState("1");
    const [cleanliness, setCleanliness] = useState("1");
    const [noise, setNoise] = useState("1");
    const [lounges, setLounges] = useState('1');
    const [quality, setQuality] = useState('1');

    const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const r = event.currentTarget.value;
      setReview(r);
    };

    const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
      const y = event.currentTarget.value;
      setYear(y);
    };

    const handleSocialChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const s = event.currentTarget.value;
        setSocial(s);
    };

    const handleConvenienceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const c = event.currentTarget.value;
        setConvenience(c);
    };

    const handleCleanlinessChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const c = event.currentTarget.value;
        setCleanliness(c);
    };

    const handleNoiseChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const n = event.currentTarget.value;
        setNoise(n);
    };

    const handleLoungesChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const l = event.currentTarget.value;
        setLounges(l);
    };

    const handleQualityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const q = event.currentTarget.value;
        setQuality(q);
    };
    
    // Creates new review in database in current dorm's collection with post request 
    const createReview = async (dormName: string) => {
        let userID = "";
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {userID = user.uid};
        const newReview = {cleanliness, convenience, lounges, noise, quality, social , year, review, userID, postID: "null"};
        const { data } = await axios.post<string>(`/createReview/${dormName}`, newReview);

        const oldReviews: ReviewWithID[] = [...reviews];
        oldReviews.push(newReview);
        setReviews(oldReviews);
    };
   
    // Creates a drop down menu for a given review category
    const dropDown = (title: string, category: string, name: string, change: (event: ChangeEvent<HTMLSelectElement>) => void ) => {
        return (
        <div>
        <span>{title}
        <select value = {category} onChange={change}>
            <option value = "1">1 - Least {name}</option>
            <option value = "2">2</option>
            <option value = "3">3</option>
            <option value = "4">4</option>
            <option value = "5">5 - Most {name}</option>
        </select>
        </span>
        <br></br>
        </div>);
    };

    return (
    <div className = {styles.createreview}>
        <h3>Leave a Review</h3>
        <textarea
            placeholder="Enter review here..."
            value={review}
            onChange={handleReviewChange}
            className = {styles.textbox}
        />
        <br></br>
        <span>Year Stayed &emsp;
        <input
            type="text"
            value={year}
            onChange={handleYearChange}
            
        />
        </span>
           
        {dropDown("Social Life", social, "social", handleSocialChange)}

        {dropDown("Convenience", convenience, "convenient", handleConvenienceChange)}

        {dropDown("Cleanliness", cleanliness, "clean", handleCleanlinessChange)}

        {dropDown("Quietness", noise, "quiet", handleNoiseChange)}

        {dropDown("Lounges", lounges, "lounge space", handleLoungesChange)}

        {dropDown("Quality/Appearance", quality, "quality", handleQualityChange)}

        <button onClick={() => {
            console.log(social)
            console.log(convenience)
            console.log(cleanliness)
            console.log(noise)
            console.log(lounges)
            console.log(quality)

            createReview(dormName);

            setReview("");
            setYear("");
            setSocial("1");
            setConvenience("1");
            setCleanliness("1");
            setNoise("1");
            setLounges("1");
            setQuality("1")
            }}>
            Submit
        </button>
    </div>)}
    
export default CreateReview;