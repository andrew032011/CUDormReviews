import { useState, ChangeEvent } from 'react';
import axios from "axios";
import styles from './createreview.module.css';
import { getAuth } from 'firebase/auth';
import { ReviewWithID } from './App';
import { Typography, Rating, Button, TextField, Card, Alert } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { borderRight } from '@mui/system';
// import ReviewButtonSet from './ReviewButtonSet';

type Prop = {
    userID: string
    dormName: string
    readonly reviews: ReviewWithID[];
    readonly setReviews: (t: ReviewWithID[]) => void;
}

const CreateReview = ({userID, dormName, reviews, setReviews}: Prop) => {
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
    const rating = (title: string, category: string, name: string, setter: (event: string) => void ) => {
        return (
            <div className = {styles.category}>{title}
            <Rating className= {styles.stars}
                name="simple-controlled"
                value={parseInt(category)}
                onChange={(event, newValue) => {
                    setter(newValue?.toString()!);
            }}
            />
        </div>);
        // <div>
        // <span>{title}
        // <select value = {category} onChange={change}>
        //     <option value = "1">1 - Least {name}</option>
        //     <option value = "2">2</option>
        //     <option value = "3">3</option>
        //     <option value = "4">4</option>
        //     <option value = "5">5 - Most {name}</option>
        // </select>
        // </span>
        // <br></br>
        // </div>);
    };

    return (
    <Card className = {styles.createreview}>
        <span className={styles.title}>Leave a Review</span>
        <TextField
            multiline
            rows={4}
            placeholder="Enter review here..."
            value={review}
            onChange={handleReviewChange}
            className = {styles.textbox}
        />
        
        <div className={styles.year}>Year Stayed
                <TextField variant="standard" sx={{width:115, marginLeft: 10}}
                    value={year}
                    onChange={handleYearChange} 
                />
        </div>
        
           
        {rating("Social Life", social, "social", setSocial)}

        {rating("Convenience", convenience, "convenient", setConvenience)}

        {rating("Cleanliness", cleanliness, "clean", setCleanliness)}

        {rating("Quietness", noise, "quiet", setNoise)}

        {rating("Lounges", lounges, "lounge space", setLounges)}

        {rating("Quality", quality, "quality", setQuality)}

        <Button className = {styles.submit} sx= {{marginTop: 3}}variant="contained" onClick={() => {
            console.log(social)
            console.log(convenience)
            console.log(cleanliness)
            console.log(noise)
            console.log(lounges)
            console.log(quality)

            if(userID !== "") {
                createReview(dormName);

                setReview("");
                setYear("");
                setSocial("1");
                setConvenience("1");
                setCleanliness("1");
                setNoise("1");
                setLounges("1");
                setQuality("1")
            }
            else {
                alert("You need to sign in before submitting a review!")
            }

            }}>
            Submit
        </Button>
    </Card>)}
    
export default CreateReview;