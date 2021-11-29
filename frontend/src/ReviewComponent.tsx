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
}


const ReviewComponent = ({cleanliness, convenience, lounges, noise, quality, social, year, review, id}: Prop) => {
    //let overallRating: Number = Number(((cleanliness+convenience+lounges+noise+quality+social)/6).toFixed(1))
    return (
    <div>
        <p className={styles.review} style={{borderColor: (quality >= 4 ? "#00ff00" : quality >= 2 ? "#FEDE00" : "#f50c0c")}}>
        <h2>Overall Quality: {quality}/5</h2>
        {'Cleanliness: '+cleanliness}<br></br>{' Convenience: '+convenience}
        <br></br>        
        {'Lounges: '+lounges}<br></br>{' Noise: '+noise}
        {/* <br></br>  
        {'Quality: ' +quality}<br></br>{' Social: '+social} */}
        <br></br>  
        {'Year: '+year}
        <br></br>  
        <b>{'Comments: '}</b>{review}</p> 
    </div>
    )
    }
export default ReviewComponent