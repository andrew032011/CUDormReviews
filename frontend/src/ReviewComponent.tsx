import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { Stats } from 'fs';
import styles from './ReviewStyle.module.css';

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
}


const ReviewComponent = ({ cleanliness, convenience, lounges, noise, quality, social, year, review, localUserID, userID, postID, dormName }: Prop) => {
    const deleteReview = async (dormName: string) => {
       await axios.delete(`/deleteReview/${dormName}/${postID}`);
    }

    let overallRating: Number = Number(((parseInt(cleanliness) + parseInt(convenience) + parseInt(lounges) + parseInt(noise) + parseInt(quality) + parseInt(social)) / 6).toFixed(1))
    return (
        <div>
            <p className={styles.review} style={{ borderColor: (overallRating >= 4 ? "#00ff00" : overallRating >= 2 ? "#FEDE00" : "#f50c0c") }}>
                <h3>Overall Quality: {overallRating}/5</h3>
                {'Year Stayed: ' + year}<br></br><br></br>
                {'Social Life: ' + social}<br></br>
                {'Convenience: ' + convenience}<br></br>
                {'Cleanliness: ' + cleanliness}<br></br>
                {' Noise: ' + noise}<br></br>
                {'Lounges: ' + lounges}<br></br>
                {'Quality: ' + quality}<br></br><br></br>

                <b>{'Comments: '}</b>{review}<br></br>
                {localUserID === userID ? <input type="button" value={"Delete Review"} onClick={(event) => {
                deleteReview(dormName);
            }} /> : <p>{/*localUserID + "   /   " + userID*/}</p>}
                </p>
            

        </div>
    )
}
export default ReviewComponent