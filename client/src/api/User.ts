import axios from "axios";

export async function getWelcomePage() {
  console.log(await axios.get("http://localhost:3000/test"));

  return await axios
    .get("https://opentdb.com/api.php?amount=10")
    .then((response) => {
      return response.data;
    });
}
