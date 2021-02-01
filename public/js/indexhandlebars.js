function breweryInfo() {
  const queryURL = "https://api.openbrewerydb.org/breweries/search?query=";

  const input = $("input[name=search]").val();

  $.ajax({
    url: queryURL + input,
    method: "GET"
  }).then(response => {
    console.log(response);

    const $brewerylist = $("#brewery-results");
    const breweries = response.filter(row => row.city === "San Diego");

    for (let i = 0; i < breweries.length; i++) {
      $brewerylist.append(`<h1> ${breweries[i].name} <button


          type="button"
          class="btn btn-dark favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
            />
          </svg>
        </button></h1>

          <h4>Address: <a href="https://www.google.com/maps/place/${breweries[i].name} /@${breweries[i].latitude} ,${breweries[i].longitude}/"> ${breweries[i].street}</a></h4>
          <h4>City: ${breweries[i].city}</h4>
          <h4> State: ${breweries[i].state}</h4>
          <h4>Phone: <a href="tel:+${breweries[i].phone}"> ${breweries[i].phone}</a></h4>
          <h4>Website: <a href="${breweries[i].website_url}"> ${breweries[i].website_url}</a></h4>
          <hr>`);
    }
  });
}

$("form#form-search").on("submit", event => {
  event.preventDefault();
  $("#brewery-results").empty();
  breweryInfo();
});
