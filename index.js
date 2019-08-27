"use strict";

// put your own value below!
const apiKey = "PwVLzBDcpXfLVRiWEDiNDN65OYc6MV3z9tEmEHJ6";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson.data[0].fullName);
  $("#results-list").empty();

  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li><h3><a href="${responseJson.data[i].url}" target="_balnk">${responseJson.data[i].fullName}</a></h3>
        <h4>STATE :${responseJson.data[i].states}</h4>
        <p>${responseJson.data[i].description}</p>
        </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function getYouTubeVideos(state, maxResults) {
  const params = {
    stateCode: state,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString + "&api_key=" + apiKey;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const stateCode = $("#js-state-code").val();
    const maxResults = $("#js-max-results").val();
    getYouTubeVideos(stateCode, maxResults);
  });
}

$(watchForm);
