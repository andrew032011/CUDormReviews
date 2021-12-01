import { Stats } from 'fs';
import styles from './ReviewStyle.module.css';

type Prop = {
    cleanliness: number;
    convenience: number;
    lounges: number;
    noise: number;
    quality: number;
    social: number;
    year: number;
    review: string;
    id: string;
    uid: string;
}


const ReviewComponent = ({ cleanliness, convenience, lounges, noise, quality, social, year, review, id, uid }: Prop) => {
    let overallRating: Number = Number(((cleanliness + convenience + lounges + noise + quality + social) / 6).toFixed(1))
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
                {'Quality: ' + quality}<br></br>

                <b>{'Comments: '}</b>{review}</p>
            {id === uid ? <input type="button" value={"Edit"} onClick={(event) => {
                console.log("button pressed");
                //handleClick(data.name);
            }} /> : <p></p>}

        </div>
    )
}
export default ReviewComponent