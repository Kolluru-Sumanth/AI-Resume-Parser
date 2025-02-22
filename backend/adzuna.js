const axios = require('axios');
require('dotenv').config();


async function fetchJobsFromAPI(skills) {
  const what=skills.join(" ")
  console.log(what)
  try{const response = await axios.get(
    `https://api.adzuna.com/v1/api/jobs/in/search/1`, {
      params: {
        app_id: process.env.ADZUNA_APP_ID,
        app_key: process.env.ADZUNA_APP_KEY,
        what_or: what
      }
    }
  );
  return response.data.results;}
  catch(err){
    console.log(err);
    return {msg:"error while fetching from adzuna"}
  }
  // console.log('Skills: ');
  // console.log(skills.join(' '));
  // console.log('Jobs: ');
  // console.log(response.data);

  
}

module.exports = { fetchJobsFromAPI };