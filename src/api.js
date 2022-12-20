import axios from "axios";

function api() {
  function instance() {
    axios.create({
      baseURL: "https://alpha-vantage.p.rapidapi.com",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "example.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });
  }
  function stockTimeSeries(symbol) {
    instance({
      method: "GET",
      url: "/query",
      params: {
        outputsize: "compact",
        datatype: "json",
        function: "TIME_SERIES_DAILY_ADJUSTED",
        symbol: symbol.toUpperCase(),
      },
    });
  }
}

export default api;
