import "./styles.css";

let dataToPrint = "";

fetch("https://restcountries.eu/rest/v2/all")
  .then(response => response.json())
  .then(allData => {
    fetch(
      "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json"
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        dataToPrint = JSON.stringify(
          myJson.map(
            ({
              name,
              ["alpha-2"]: alpha2,
              ["alpha-3"]: alpha3,
              ["country-code"]: countryCode
            }) => ({
              name,
              "alpha-2": alpha2,
              "alpha-3": alpha3,
              "country-code":
                "+" +
                allData.find(item => item.alpha2Code === alpha2).callingCodes[0]
            })
          )
        );

        document.getElementById("app").innerHTML = `
      <h1>Data!</h1>
      <p>
        We use Parcel to bundle this sandbox, you can find more info about Parcel
        <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
      <div>
        ${dataToPrint}
      </div>
      `;
      });
  });
