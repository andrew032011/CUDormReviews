import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import DormPage from './DormPage';
import HomePage from './HomePage';
import EditReviewsAuth from './EditReviewsAuth';
import Authenticated from './Authenticated';

// To be used by other files
export type ReviewWithID = {
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


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dormName, setDormName] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>CUDormReviews</h1>
        <SearchBar
          searchQuery={searchQuery}
          handleFilterTextChange={setSearchQuery}
        />
        <HomePage
          searchQuery={searchQuery}
          handleClick={setDormName}
        />
        <DormPage
          // The reviewData will only be the data for the particular dorm from Firebase; we still need to make a way to extract that from the search term.  For now the same data will display on all dorms
          // Replace this below with the "review" state declared above; this is just testing data for now
          // reviewData={[
          //   {
          //     cleanliness: 5, convenience: 2, lounges: 5, noise: 5, quality: 3, social: 2, year: 1, review:
          //       "So it was ok because I didn't like it that much but I have high standards but it was ok so I'm going to give it a mediocre rating.", id: ""
          //   },
          //   {
          //     cleanliness: 2, convenience: 5, lounges: 4, noise: 4, quality: 5, social: 1, year: 1, review:
          //       "Literally the best dorm ever OMG so good so good so good so good I really like it so good so good so good so good so good.", id: ""
          //   },
          //   {
          //     cleanliness: 2, convenience: 2, lounges: 4, noise: 4, quality: 1, social: 1, year: 1, review:
          //       "Worst dorm ever.", id: ""
          //   }
          // ]}
          dormName={dormName}
        />
        <Authenticated>
          {/* <EditReviewsAuth
            reviewData={[
              {
                cleanliness: 5, convenience: 2, lounges: 5, noise: 5, quality: 3, social: 2, year: 1, review:
                  "This will be made up with reviews corresponding to the user's ID.  Then, the user will be able to edit these reviews.  So, we will have to ensure that the same ID is created for each review, and this may require moving to a singular collection?  OR to make this a lot easier to code, we can just make it such that an edit button appears next to each review that was made for the dorm on each dorm page.  That way, we don't need to make multiple collections; we only need a singular user ID to maintain.  Speaking of which, when a user is first created, i guess we'll create a unique ID for them somehow.  then somehow we'll need to associate that with the user such that when the user logs in again, it doesn't give them a new ID.  Then, when displaying the reviews for each dorm page, it will check if the current user ID matches with the one for that review; if so, it will enable the edit button next to the review.", id: "insertIDHere"
              }
            ]}
          /> */}
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