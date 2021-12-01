import { useEffect, useState } from 'react';
import { DormMap, ReviewWithID } from './App'
import ReviewComponent from './ReviewComponent'
import {getAuth} from "firebase/auth"

// This component will simply take in the name of the dorm that the user clicked on to display information about the dorm.
// This component will also take in the overall reviews for the dorm

type Props = {
  //readonly reviewData: ReviewWithID[];
  readonly dormName: string;
}

const DormPage = ({ /*reviewData,*/ dormName }: Props) => {
  const [reviews, setReview] = useState<ReviewWithID[]>([]);

  useEffect(() => {
    document.title = dormName + " - CUDormReviews";
  })

  useEffect(() => {
    fetch("/getReviews/" + dormName)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, [dormName/*, reviews*/]);

  let userID = "";

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {userID = user.uid};
  }, [dormName]);

  return (
    <div>
      {dormName.length > 0 ?
        <div>
          <h2>{DormMap.get(dormName)?.name}</h2>
          <h4>{DormMap.get(dormName)?.location}</h4>
          <img src={DormMap.get(dormName)?.picLink} alt={DormMap.get(dormName)?.name}></img>
          <p>Number of Residents: {DormMap.get(dormName)?.residents}</p>
          <p>Has Singles: {DormMap.get(dormName)?.singles ? "Yes" : "No"}</p>
          <p>Has Doubles: {DormMap.get(dormName)?.doubles ? "Yes" : "No"}</p>
          <p>Has Triples: {DormMap.get(dormName)?.triples ? "Yes" : "No"}</p>
          <p>Has Quads: {DormMap.get(dormName)?.quads ? "Yes" : "No"}</p>
          <p>Rooms arranged in Suites: {DormMap.get(dormName)?.suites ? "Yes" : "No"}</p>
          <p>Rooms arranged in Pods: {DormMap.get(dormName)?.pods ? "Yes" : "No"}</p>
          <p>Rooms arranged along Corridors: {DormMap.get(dormName)?.corridors ? "Yes" : "No"}</p>
          <p>Has AC: {DormMap.get(dormName)?.ac ? "Yes" : "No"}</p>
          <p>Has Elevators: {DormMap.get(dormName)?.elevators ? "Yes" : "No"}</p>
          <p>Has a Dining Hall: {DormMap.get(dormName)?.dining ? "Yes" : "No"}</p>
          <a href={DormMap.get(dormName)?.housingWebsite}>Read more on the Housing webpage</a>

          <p>Social Life: {(reviews.reduce((sum, curr) => sum + curr.social, 0) / reviews.length).toFixed(1)}</p>
          <p>Convenience: {(reviews.reduce((sum, curr) => sum + curr.convenience, 0) / reviews.length).toFixed(1)}</p>
          <p>Cleanliness: {(reviews.reduce((sum, curr) => sum + curr.cleanliness, 0) / reviews.length).toFixed(1)}</p>
          <p>Noise: {(reviews.reduce((sum, curr) => sum + curr.noise, 0) / reviews.length).toFixed(1)}</p>
          <p>Lounges: {(reviews.reduce((sum, curr) => sum + curr.lounges, 0) / reviews.length).toFixed(1)}</p>
          <p>Quality/Appearance: {(reviews.reduce((sum, curr) => sum + curr.quality, 0) / reviews.length).toFixed(1)}</p>
          {reviews.length > 0 ?
          reviews.map((review, idx) => (
            <ReviewComponent key={idx} {...review} uid={userID}/>
          )) : <h4>No Reviews for {dormName} :(<br></br>Be the first to add a review</h4>}

          
        </div> : <p></p>}
    </div>
  )
}

export default DormPage;