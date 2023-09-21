import './App.css';
import { useState, useEffect } from "react";
import RecipeReviewCard from './components/card';
import { Grid } from '@mui/material'

function App() {

  let [phoneNumbres, setPhoneNumbres] = useState(null)
  console.log(phoneNumbres);

  useEffect(() => {
    aaa()
  }, [])

  const aaa = () => {
    let headers = {}
    fetch("https://c6a6-147-235-79-190.ngrok-free.app/getphonenumbers", {
      method: "GET",
      mode: 'no-cors',
      headers: headers
    })
      .then(async response => await response.json())
      .then(data => {
        setPhoneNumbres(data)
      })
  }



  return (
    <div className="App">
      <header className="App-header">
        <br />
        <h3>רשימת משתמשים</h3>
      </header>
      <Grid container justifyContent="center">
        <RecipeReviewCard phoneNumbres={phoneNumbres} />
      </Grid>
    </div>
  );
}

export default App;
