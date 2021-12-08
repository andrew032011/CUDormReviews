import { useEffect } from 'react';
import { DormMap, ReviewWithID } from './App'
import ReviewComponent from './ReviewComponent'

type Props = {
  readonly reviewData: ReviewWithID[];
}

const EditReviewsAuth = ({ reviewData }: Props) => {

  // return (
  //   <div>
  //     <h3>Your Reviews</h3>
  //     {reviewData.map((review, idx) => (
  //       <ReviewComponent key={idx} {...review} />
  //     ))}
  //   </div>
  // )
}

export default EditReviewsAuth;