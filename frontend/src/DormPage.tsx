import { DormMap, ReviewWithID } from './App'

// This page will simply take in the name of the dorm (using the searchQuery state for now)
// that the user clicked on to display information about the dorm.
// This page will also take in the overall reviews for the dorm

type Props = {
  readonly reviewData: ReviewWithID[];
  readonly searchQuery: string;
}

// TODO: MAYBE MAKE A NEW PROP CALLED LIKE "DORMNAME" OR SMTH THAT TAKES IN THE DORM NAME; WE WILL FIGURE OUT HOW TO PASS THAT LATER???

const DormPage = ({ reviewData, searchQuery }: Props) => {

  return (
    <div>
      <div>
        <h2>{DormMap.get(searchQuery)?.name}</h2>
        <h4>{DormMap.get(searchQuery)?.location}</h4>
        <img src={DormMap.get(searchQuery)?.picLink} alt={DormMap.get(searchQuery)?.name}></img>
        <p>Number of Residents: {DormMap.get(searchQuery)?.residents}</p>
        <p>Has Singles: {DormMap.get(searchQuery)?.singles ? "Yes" : "No"}</p>
        <p>Has Doubles: {DormMap.get(searchQuery)?.doubles ? "Yes" : "No"}</p>
        <p>Has Triples: {DormMap.get(searchQuery)?.triples ? "Yes" : "No"}</p>
        <p>Has Quads: {DormMap.get(searchQuery)?.quads ? "Yes" : "No"}</p>
        <p>Rooms arranged in Suites: {DormMap.get(searchQuery)?.suites ? "Yes" : "No"}</p>
        <p>Rooms arranged in Pods: {DormMap.get(searchQuery)?.pods ? "Yes" : "No"}</p>
        <p>Rooms arranged along Corridors: {DormMap.get(searchQuery)?.corridors ? "Yes" : "No"}</p>
        <p>Has AC: {DormMap.get(searchQuery)?.ac ? "Yes" : "No"}</p>
        <p>Has Elevators: {DormMap.get(searchQuery)?.elevators ? "Yes" : "No"}</p>
        <p>Has a Dining Hall: {DormMap.get(searchQuery)?.dining ? "Yes" : "No"}</p>
        <a href={DormMap.get(searchQuery)?.housingWebsite}>Read more on the Housing webpage</a>
      </div>

      <div>
        <p>Social Life: {reviewData.reduce((sum, curr) => sum + curr.social, 0)/reviewData.length}</p>
        <p>Convenience: {reviewData.reduce((sum, curr) => sum + curr.convenience, 0)/reviewData.length}</p>
        <p>Cleanliness: {reviewData.reduce((sum, curr) => sum + curr.cleanliness, 0)/reviewData.length}</p>
        <p>Noise: {reviewData.reduce((sum, curr) => sum + curr.noise, 0)/reviewData.length}</p>
        <p>Lounges: {reviewData.reduce((sum, curr) => sum + curr.lounges, 0)/reviewData.length}</p>
        <p>Quality/Appearance: {reviewData.reduce((sum, curr) => sum + curr.quality, 0)/reviewData.length}</p>
      </div>

    </div>
  )
}

export default DormPage;