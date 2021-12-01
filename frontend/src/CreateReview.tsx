import { useState, ChangeEvent } from 'react';
import axios from "axios";
import styles from './createreview.module.css';
// import ReviewButtonSet from './ReviewButtonSet';

type Prop = {
    dormName: string
}

const CreateReview = ({dormName}: Prop) => {
    const [review, setReview] = useState('');
    const [year, setYear] = useState('');
    const [social, setSocial] = useState('');
    const [convenience, setConvenience] = useState('');
    const [cleanliness, setCleanliness] = useState('');
    const [noise, setNoise] = useState('');
    const [lounges, setLounges] = useState('');
    const [quality, setQuality] = useState('');

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
        const newReview = {cleanliness, convenience, lounges, noise, quality, social , year, review};
        const { data } = await axios.post<string>(`/createReview/${dormName}`, newReview);
    };
   
    // Creates a drop down menu for a given review category
    const dropDown = (title: string, category: string, change: (event: ChangeEvent<HTMLSelectElement>) => void ) => {
        return (
        <div>
        <span>{title}
        <select value = {category} onChange={change}>
            <option value = "1">1</option>
            <option value = "2">2</option>
            <option value = "3">3</option>
            <option value = "4">4</option>
            <option value = "5">5</option>
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
           
        {dropDown("Social Life", social, handleSocialChange)}

        {dropDown("Convenience", convenience, handleConvenienceChange)}

        {dropDown("Cleanliness", cleanliness, handleCleanlinessChange)}

        {dropDown("Noise", noise, handleNoiseChange)}

        {dropDown("Lounges", lounges, handleLoungesChange)}

        {dropDown("Quality/Appearance", quality, handleQualityChange)}

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
            setSocial("");
            setConvenience("");
            setCleanliness("");
            setNoise("");
            setLounges("");
            setQuality("")
            }}>
            Submit
        </button>
    </div>)}
    
export default CreateReview;