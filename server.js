const express = require('express');
const axios = require('axios');

// const uuid4 = require('uuid');
// const test_uuid = uuid4.v4();

// Config Set Up
const targetEnv = 'https://sandbox.dev.clover.com'; // Pointing to Sandbox Environment
// const targetEnv = 'https://www.clover.com'; // Pointing to Prod Environment

const appID = ''; // Input your app ID here
const appSecret = ''; // Input your app secret here

// Initialize Express
const app = express();

// Root Route
app.get('/', (req, res) => authenticate(req, res));

// Steps 1 & 2 - Request merchant authorization to receive authorization code
const authenticate = async (req, res) => {
  const url = `${targetEnv}/oauth/authorize?client_id=${appID}`;

  /* If there is no code parameter in the query string of the current url
  redirect user for authentication. If there isn't then request API token */
  !req.query.code ? await res.redirect(url) : await requestAPIToken(res, req.query);
}

// Steps 3 & 4 - Request and serve up API token using the received authorization code
const requestAPIToken = async (res, query) => {
  const url = `${targetEnv}/oauth/token?client_id=${appID}&client_secret=${appSecret}&code=${query.code}`;

  // Request
  await axios.get(url)
    .then(({ result }) => {    
    res.send(result)

    // const sdk = require('api')('@clover-platform/v3#g4lh1ylawketdl');

    //     sdk.createToken(
    //         { card: { number: "6011361000006668",exp_month: "12", exp_year: "2023",cvv: "123",brand: "DISCOVER"}}, 
    //         { apikey: ''})

    //     .then(({ data }) => {
    //     console.log(data.id)

    //     const options = {
    //         method: 'POST',
    //         headers: {
    //         accept: 'application/json',
    //         'content-type': 'application/json',
    //         'idempotency-key' : test_uuid,
    //         authorization: `Bearer ${result.access_token}`
    //         },
    //         body: JSON.stringify({
    //             ecomind: 'ecom',
    //             currency: 'usd',
    //             amount: 1100,
    //             source: 
    //             data.id,
                
    //             tax_rate_uuid: 'Q0NVFCYTZ4KYE'
    //         })
    //     };
        
    //     fetch('https://scl-sandbox.dev.clover.com/v1/charges', options)
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log("response https://scl-sandbox.dev.clover.com/v1/charges");
    //             console.log(response)}
    //             )
    //         .catch(err => console.error(err));


    //     }).catch(err => console.error(err));





})
    .catch(err => res.send(err.message));
}

// Dynamic Port Binding
const port = process.env.port || 8080
app.listen(port, () => console.log(`🍀 Run http://localhost:${port} in your browser`));