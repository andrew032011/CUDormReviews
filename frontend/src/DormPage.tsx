import { useEffect } from 'react';
import { DormMap, ReviewWithID } from './App'
import CreateReview from './CreateReview';

// This component will simply take in the name of the dorm that the user clicked on to display information about the dorm.
// This component will also take in the overall reviews for the dorm

type Props = {
  readonly reviewData: ReviewWithID[];
  readonly dormName: string;
}


const DormPage = ({ reviewData, dormName }: Props) => {

  useEffect(() => {
    document.title = dormName + " - CUDormReviews";
  })

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

          <p>Social Life: {reviewData.reduce((sum, curr) => sum + curr.social, 0) / reviewData.length}</p>
          <p>Convenience: {reviewData.reduce((sum, curr) => sum + curr.convenience, 0) / reviewData.length}</p>
          <p>Cleanliness: {reviewData.reduce((sum, curr) => sum + curr.cleanliness, 0) / reviewData.length}</p>
          <p>Noise: {reviewData.reduce((sum, curr) => sum + curr.noise, 0) / reviewData.length}</p>
          <p>Lounges: {reviewData.reduce((sum, curr) => sum + curr.lounges, 0) / reviewData.length}</p>
          <p>Quality/Appearance: {reviewData.reduce((sum, curr) => sum + curr.quality, 0) / reviewData.length}</p>
          <CreateReview dormName = {dormName}></CreateReview>
        </div> : <p></p>}
    </div>
  )
}

export default DormPage;