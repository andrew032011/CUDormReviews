import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import DormPage from './DormPage';
import HomePage from './HomePage';
import EditReviewsAuth from './EditReviewsAuth';
import Authenticated from './Authenticated';
import CreateReview from './CreateReview';

// To be used by other files
export type ReviewWithID = {
  cleanliness: string;
  convenience: string;
  lounges: string;
  noise: string;
  quality: string;
  social: string;
  year: string;
  review: string;
  userID: string;
  postID: string;
}

export type Filter = {
  hasAC: boolean
  hasSingles: boolean;
  hasDoubles: boolean;
  hasTriples: boolean;
  hasQuads: boolean;
  hasSuites: boolean;
  hasPods: boolean;
  hasCorridors: boolean;
  hasElevators: boolean;
  hasDining: boolean;
}

let searchFilter: Filter = {
  hasAC: false,
  hasSingles: false,
  hasDoubles: false,
  hasTriples: false,
  hasQuads: false,
  hasSuites: false,
  hasPods: false,
  hasCorridors: false,
  hasElevators: false,
  hasDining: false
}


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dormName, setDormName] = useState("");
  const [uid, setUid] = useState("");
  const [reviews, setReview] = useState<ReviewWithID[]>([]);
  const [hasAC, setHasAC] = useState(false);
  const [hasSingles, setHasSingles] = useState(false);
  const [hasDoubles, setHasDoubles] = useState(false);
  const [hasTriples, setHasTriples] = useState(false);
  const [hasQuads, setHasQuads] = useState(false);
  const [hasSuites, setHasSuites] = useState(false);
  const [hasPods, setHasPods] = useState(false);
  const [hasCorridors, setHasCorridors] = useState(false);
  const [hasElevators, setHasElevators] = useState(false);
  const [hasDining, setHasDining] = useState(false);
  searchFilter = {hasAC, hasSingles, hasDoubles, hasTriples, hasQuads, hasSuites, hasPods, hasCorridors, hasElevators, hasDining}

  return (
    <div className="App">
      <header className="App-header">
        <h1>CUDormReviews</h1>
        <SearchBar
          searchQuery={searchQuery}
          handleFilterTextChange={setSearchQuery}
          hasAC = {hasAC}
          handleACCheckBoxChange={(e) => setHasAC(e.target.checked)}
          hasSingles = {hasSingles}
          handleSinglesCheckBoxChange={(e) => setHasSingles(e.target.checked)}
          hasDoubles = {hasDoubles}
          handleDoublesCheckBoxChange={(e) => setHasDoubles(e.target.checked)}
          hasTriples = {hasTriples}
          handleTriplesCheckBoxChange={(e) => setHasTriples(e.target.checked)}
          hasQuads = {hasQuads}
          handleQuadsCheckBoxChange={(e) => setHasQuads(e.target.checked)}
          hasSuites = {hasSuites}
          handleSuitesCheckBoxChange={(e) => setHasSuites(e.target.checked)}
          hasPods = {hasPods}
          handlePodsCheckBoxChange={(e) => setHasPods(e.target.checked)}
          hasCorridors = {hasCorridors}
          handleCorridorsCheckBoxChange={(e) => setHasCorridors(e.target.checked)}
          hasElevators = {hasElevators}
          handleElevatorsCheckBoxChange={(e) => setHasElevators(e.target.checked)}
          hasDining = {hasDining}
          handleDiningCheckBoxChange={(e) => setHasDining(e.target.checked)}
        />
        <HomePage
          searchQuery={searchQuery}
          handleClick={setDormName}
          searchFilter={searchFilter}
        />
        <DormPage
          dormName={dormName}
          reviews={reviews}
          setReview={setReview}
          //uid={uid}
        />
        <Authenticated dormName={dormName} setReview={setReview} >
          {dormName.length > 0 ? 
            <CreateReview
            dormName={dormName}
            reviews={reviews}
            setReviews={setReview}
            //uid={uid}
          /> : <h3>Search for a dorm above!</h3>
          }
          </Authenticated>
          
        
      </header>
    </div>
  );
}

export default App;

// BEGIN HARDCODED DATA
export type Dorm = {
  singles: boolean;
  doubles: boolean;
  triples: boolean;
  quads: boolean;
  suites: boolean;
  pods: boolean;
  corridors: boolean;
  residents: number;
  ac: boolean;
  elevators: boolean;
  dining: boolean;
  housingWebsite: string;
  picLink: string;
  name: string;
  location: string;
}

const mews: Dorm = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: false,
  pods: true,
  corridors: false,
  residents: 260,
  ac: true,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/first-year-undergraduates/residence-halls/mews-hall",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2019-09/Mews_1.png?h=4380f786&itok=KFIPyz0k",
  name: "Mews Hall",
  location: "North Campus"
}

const ganedago: Dorm = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: true,
  pods: false,
  corridors: false,
  residents: 520,
  ac: true,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/first-year-undergraduates/residence-halls/ganedago-hall",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2020-10/SophSiteRendering.JPG?h=473ee7f7&itok=A__s8kaO",
  name: "Ganędagǫ: Hall",
  location: "North Campus"
}

const donlon: Dorm = {
  singles: true,
  doubles: true,
  triples: false,
  quads: true,
  suites: false,
  pods: false,
  corridors: true,
  residents: 450,
  ac: false,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/first-year-undergraduates/residence-halls/mary-donlon-hall",
  picLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Mary_Donlon_Hall%2C_Cornell_University.jpg/800px-Mary_Donlon_Hall%2C_Cornell_University.jpg",
  name: "Mary Donlon Hall",
  location: "North Campus"
}

const becker: Dorm = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: true,
  pods: false,
  corridors: true,
  residents: 350,
  ac: true,
  elevators: true,
  dining: true,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/upperlevel-undergraduates/west-campus-house-system/carl-becker-house",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2019-11/Screen%20Shot%202019-11-08%20at%2011.22.01%20AM.png?h=76e9374a&itok=VerXzdGa",
  name: "Carl Becker House",
  location: "West Campus"
}

const cascadilla: Dorm = {
  singles: true,
  doubles: true,
  triples: false,
  quads: false,
  suites: false,
  pods: false,
  corridors: true,
  residents: 366,
  ac: false,
  elevators: true,
  dining: false,
  housingWebsite: "https://scl.cornell.edu/residential-life/housing/campus-housing/upperlevel-undergraduates/residence-halls/cascadilla-hall",
  picLink: "https://scl.cornell.edu/sites/scl/files/styles/portrait_image/public/2019-11/Screen%20Shot%202019-11-08%20at%2011.27.56%20AM.png?h=5b16f0df&itok=TklGYZ07",
  name: "Cascadilla Hall",
  location: "South Campus"
}

export const DormMap = new Map([
  ["Mews Hall", mews],
  ["Ganędagǫ: Hall", ganedago],
  ["Mary Donlon Hall", donlon],
  ["Carl Becker House", becker],
  ["Cascadilla Hall", cascadilla]
])

export const DormArray: Array<Dorm> = [mews, ganedago, donlon, becker, cascadilla];