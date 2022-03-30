const axios = require("axios");

exports.Countries = async (req, res) => {
  try {
    let data = await (() => {
      return axios
        .get(
          "https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json"
        )
        .then((response) => {
          this.response = response.data;
          return this.response;
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    data = JSON.parse(JSON.stringify(data));
    let find = data.map((country) => {
      return {
        name: country.name,
        region: country.region,
        timezones: country.timezones,
      };
    });

    res.status(200).send({
      status: "success",
      data: find,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
