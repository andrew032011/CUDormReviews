import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  User,
  GoogleAuthProvider,
  onAuthStateChanged,
  getAuth,
  signOut,
} from 'firebase/auth';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { ReviewWithID } from './App';
import styles from './App.module.css';
import {Button } from '@mui/material';

const firebaseConfig = {
  // put firebase config in here.
  // You can find the config in Project Settings > General
  // and choose the Config option in Firebase SDK snippet
  apiKey: "AIzaSyApFN9JTuIKz_4JbMOntUKfb6o1HYSqE5I",
  authDomain: "webdeva2-478bd.firebaseapp.com",
  projectId: "webdeva2-478bd",
  storageBucket: "webdeva2-478bd.appspot.com/",
  messagingSenderId: "544198736831",
  appId: "1:544198736831:web:3e9c78a50fbda7b61bbf0a",
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);

type Props = {
  readonly children: React.ReactNode;
  readonly dormName: string;
  readonly setReview: (t: ReviewWithID[]) => void;
};

const Authenticated = ({ children, dormName, setReview }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  };

  useEffect(() => {
    onAuthStateChanged(auth, setUser)
  }, []);

  useEffect(() => {
    fetch("/getReviews/" + dormName)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <h4>Hi, {user.displayName}!</h4>
          <Button variant="contained" onClick={() =>
          {signOut(auth)
            //window.location.reload();
          }}>Sign Out</Button>
          {children}
        </>
      ) : (
        <div className= {styles.auth}>
          <span >To add reviews or edit your existing reviews, please log in below!</span>
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      )}
    </>
  );
};

export default Authenticated;