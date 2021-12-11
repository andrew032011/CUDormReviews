import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { Stats } from 'fs';
import { ReviewWithID } from './App';
import styles from './ReviewStyle.module.css';
import { Box, Button } from '@mui/material';
import { red } from '@mui/material/colors';

type Prop = {
    cleanliness: string;
    convenience: string;
    lounges: string;
    noise: string;
    quality: string;
    social: string;
    year: string;
    review: string;
    localUserID: string;
    userID: string;
    postID: string;
    dormName: string;

    readonly reviews: ReviewWithID[];
    readonly setReviews: (t: ReviewWithID[]) => void;
}


const ReviewComponent = ({ cleanliness, convenience, lounges, noise, quality, social, year, review, localUserID, userID, postID, dormName, reviews, setReviews }: Prop) => {
    const deleteReview = async (dormName: string) => {
       await axios.delete(`/deleteReview/${dormName}/${postID}`);

       const oldReviews: ReviewWithID[] = [...reviews];
        const newReviews = oldReviews.filter(x => x.postID !== postID);
        console.log(newReviews);
        setReviews(newReviews);
    }

    let overallRating: Number = Number(((parseInt(cleanliness) + parseInt(convenience) + parseInt(lounges) + parseInt(noise) + parseInt(quality) + parseInt(social)) / 6).toFixed(1))
    return (
        <div style={{ borderColor: (overallRating >= 4 ? "#00ff00" : overallRating >= 2 ? "#FEDE00" : "#f50c0c")}} className = {styles.reviewbox}>
            <Box >
                <Box className = {styles.reviewsummary}>
                    <div className={styles.reviewcategory}>
                        <div >Social Life</div>
                        <div className={styles.categoryvalue}>{social}</div>
                    </div>
                    <div className={styles.reviewcategory}>
                        <div>Convenience</div>
                        <div className={styles.categoryvalue}>{convenience}</div>
                    </div>
                    <div className={styles.reviewcategory}>
                        <div>Cleanliness</div>
                        <div className={styles.categoryvalue}>{cleanliness}</div>
                    </div>
                    <div className={styles.reviewcategory}>
                        <div>Quietness</div>
                        <div className={styles.categoryvalue}>{noise}</div>
                    </div>
                    <div className={styles.reviewcategory}>
                        <div>Lounges</div>
                        <div className={styles.categoryvalue}>{lounges}</div>
                    </div>
                    <div className={styles.reviewcategory}>
                        <div>Quality</div>
                        <div className={styles.categoryvalue}>{quality}</div>
                    </div>
                </Box>
                <Box className = {styles.reviewandyear}>
                    <div className = {styles.comments}>
                        {review}

                    </div>
                    <div className={styles.year}>
                            <div>Year Stayed: &nbsp;</div>
                            <div>{year!= "" ? year: "N/A"}</div>
                            {localUserID === userID ? <Button sx={{marginLeft: 42}} variant="contained" onClick={(event) => {
                            deleteReview(dormName);
                            }}>Delete Review</Button>: <p>{/*localUserID + "   /   " + userID*/}</p>}
                    </div>
                </Box>
            </Box>
        </div>
    )
}
export default ReviewComponent