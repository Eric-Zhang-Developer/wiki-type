import axios from "axios";

export default async function fetchPage(): Promise<string>{
  const API_URL = "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exintro=1&explaintext=1&format=json&origin=*";
  try {
    const response = await axios.get(API_URL);
    console.log("Data", response.data);
    const page_id = Object.keys(response.data.query.pages)[0];
    console.log(page_id);
    return JSON.stringify(response.data.query.pages[page_id].extract);
  } 

  catch (error) {
    console.error("API Fetch Error", error);
    return "API Fetch Error";
  }
  

}


