import axios from "axios";

export default async function fetchPage(): Promise<string>{
  const API_URL = "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext=1&format=json&origin=*";
  try {
    const response = await axios.get(API_URL);
    console.log("Data", response.data);
    return JSON.stringify(response.data);
  } 

  catch (error) {
    console.error("API Fetch Error", error);
    return "API Fetch Error";
  }
  

}


