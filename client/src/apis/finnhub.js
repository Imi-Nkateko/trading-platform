import axios from "axios";

const TOKEN = "cvetrbhr01qjugseu7t0cvetrbhr01qjugseu7tg";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
