import { useEffect, useState } from 'react';
import { DormMap, ReviewWithID } from './App'
import ReviewComponent from './ReviewComponent'
import { getAuth } from "firebase/auth"
import CreateReview from './CreateReview';
import { Box, TableContainer, Table, TableRow, TableCell, Paper, Card, CardContent, CardActions, Link, Button, CardHeader } from '@mui/material';
import styles from './App.module.css';
import { textAlign } from '@mui/system';
// This component will simply take in the name of the dorm that the user clicked on to display information about the dorm.
// This component will also take in the overall reviews for the dorm

type Props = {
  readonly reviews: ReviewWithID[];
  readonly dormName: string;
  readonly setReview: (t: ReviewWithID[]) => void;
}

const DormPage = ({ reviews, dormName, setReview }: Props) => {
  //const [reviews, setReview] = useState<ReviewWithID[]>([]);

  const uid = () => (getAuth().currentUser !== null ? getAuth().currentUser!.uid! : "");

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

  return (
    <div>
      {dormName.length > 0 ?
        <div>
          <h2 className = {styles.dormtitle}>{DormMap.get(dormName)?.name}</h2>
          <div className = {styles.imagediv}>
            <img src={DormMap.get(dormName)?.picLink} alt={DormMap.get(dormName)?.name} className = {styles.image}></img>
          </div>
          <div>
          <div className= {styles.generalinfo}>
            <Card variant="outlined">
              <CardHeader title="General Information"></CardHeader>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableRow>
                      <TableCell variant="head">Location</TableCell>
                      <TableCell>{DormMap.get(dormName)?.location}</TableCell>
                      <TableCell variant="head">Residents</TableCell>
                      <TableCell>{DormMap.get(dormName)?.residents}</TableCell>
                      <TableCell variant="head">Elevators</TableCell>
                      <TableCell>{DormMap.get(dormName)?.elevators ? "Yes" : "No"}</TableCell>
                      <TableCell variant="head">Dining Hall</TableCell>
                      <TableCell>{DormMap.get(dormName)?.dining ? "Yes" : "No"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">AC</TableCell>
                      <TableCell>{DormMap.get(dormName)?.ac ? "Yes" : "No"}</TableCell>
                      <TableCell variant="head">Singles</TableCell>
                      <TableCell>{DormMap.get(dormName)?.singles ? "Yes" : "No"}</TableCell>
                      <TableCell variant="head">Doubles</TableCell>
                      <TableCell>{DormMap.get(dormName)?.doubles ? "Yes" : "No"}</TableCell>
                      <TableCell variant="head">Triples</TableCell>
                      <TableCell>{DormMap.get(dormName)?.triples ? "Yes" : "No"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Quads</TableCell>
                      <TableCell>{DormMap.get(dormName)?.quads ? "Yes" : "No"}</TableCell>
                      <TableCell variant="head">Suites</TableCell>
                      <TableCell>{DormMap.get(dormName)?.suites ? "Yes" : "No"}</TableCell>
                      <TableCell variant="head">Pods</TableCell>
                      <TableCell>{DormMap.get(dormName)?.pods ? "Yes" : "No"}</TableCell>
                      <TableCell variant="head">Corridors</TableCell>
                      <TableCell>{DormMap.get(dormName)?.corridors ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
                <CardActions sx={{justifyContent:'center'}}>
                  <Button href={DormMap.get(dormName)?.housingWebsite} size="small" >{DormMap.get(dormName)?.name} Housing Webpage</Button>
                </CardActions>
              </CardContent>
            </Card>
          </div>
          </div>
          <Box className = {styles.reviewsummary}>
            <div >
              <div className = {styles.summarynumber}> {reviews.length > 0?(reviews.reduce((sum, curr) => sum + parseInt(curr.social), 0) / reviews.length).toFixed(1): "N/A"}</div>
              <div className = {styles.summarycategory}>Social Life</div>
            </div>
            <div>
              <div className = {styles.summarynumber}>  {reviews.length > 0?(reviews.reduce((sum, curr) => sum + parseInt(curr.convenience), 0) / reviews.length).toFixed(1): "N/A"}</div>
              <div className = {styles.summarycategory}>Convenience</div>
            </div>
            <div>
              <div className = {styles.summarynumber}>  {reviews.length > 0?(reviews.reduce((sum, curr) => sum + parseInt(curr.cleanliness), 0) / reviews.length).toFixed(1): "N/A"}</div>
              <div className = {styles.summarycategory}>Cleanliness</div>
            </div>
            <div>
              <div className = {styles.summarynumber}>  {reviews.length > 0?(reviews.reduce((sum, curr) => sum + parseInt(curr.noise), 0) / reviews.length).toFixed(1): "N/A"}</div>
              <div className = {styles.summarycategory}>Quietness</div>
            </div>
            <div>
              <div className = {styles.summarynumber}>  {reviews.length > 0?(reviews.reduce((sum, curr) => sum + parseInt(curr.lounges), 0) / reviews.length).toFixed(1): "N/A"}</div>
              <div className = {styles.summarycategory}>Lounges</div>
            </div>
            <div>
              <div className = {styles.summarynumber}>  {reviews.length > 0?(reviews.reduce((sum, curr) => sum + parseInt(curr.quality), 0) / reviews.length).toFixed(1): "N/A"}</div>
              <div className = {styles.summarycategory}>Quality</div>
            </div>
          </Box>
          
          <div className={styles.review}>
          {dormName.length > 0 ? 
              <CreateReview
              userID = {uid()}
              dormName={dormName}
              reviews={reviews}
              setReviews={setReview}
              //uid={uid}
            /> : <h3></h3>
            }
                      {reviews.length > 0 ?
            <div className = {styles.reviewlist}>
            {reviews.map((review, idx) => (
              <ReviewComponent key={idx} {...review} localUserID={uid()} dormName={dormName} reviews={reviews} setReviews={setReview}/>))}
              </div>
           : <h4 className = {styles.space}>No reviews for {dormName} :(<br></br>Be the first to add a review!</h4>}
          </div>

        </div> : <p></p>}
    </div>
  )
}

export default DormPage;