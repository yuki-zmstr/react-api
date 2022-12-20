import axios from "axios";

function api() {
  function instance() {
    axios.create({
      baseURL: "https://example.com",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "example.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });
  }
  function getData() {
    instance({
      method: "GET",
      url: "/query",
      params: {
        search: "parameter",
      },
      transformResponse: [
        function (data) {
          console.log("Transforming data...");
          const json = JSON.parse(data);
          const dates = Object.keys(json["nested object"]);
          data = { dates };
          return data;
        },
      ],
    });
  }

  function postData() {
    instance({
      method: "POST",
      url: "/api",
      data: {
        item1: "data1",
        item2: "item2",
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

export default api;
