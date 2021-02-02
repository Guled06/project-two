$(document).ready(() => {
  //   let renderArr;
  function breweryInfo() {
    $.ajax({
      url: "api/user_favorite/view",
      method: "GET"
    }).then(breweries => {
      console.log(breweries);
      const $brewerylist = $("#favorite-breweries");
      //   renderArr = breweries;
      for (let i = 0; i < breweries.length; i++) {
        $brewerylist.append(`<h1> ${breweries[i].name} <button


      
      type="button"
      class="btn btn-dark delete"
      value="${breweries[i].id}"
    >

    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>

      
    </button></h1>

      <h4>Address: <a href="https://www.google.com/maps/place/${breweries[i].name} /@${breweries[i].latitude} ,${breweries[i].longitude}/"> ${breweries[i].location}</a></h4>
      <!-- <h4>Address2: <a href="http://maps.google.com/maps?q=${breweries[i].location}">${breweries[i].location}</a></h4> alternate route for getting to google maps (using data in our db); will search local -->
      <!-- <h4>City: ${breweries[i].city}</h4> -->
      <!-- <h4> State: ${breweries[i].state}</h4> -->
      <h4>Phone: <a href="tel:+${breweries[i].phone}"> ${breweries[i].phone}</a></h4>
      <h4>Website: <a href="${breweries[i].website}"> ${breweries[i].website}</a></h4>
      <hr>`);
      }
    });
  }
  breweryInfo();

  $("#favorite-breweries").on("click", ".delete", function() {
    const selId = $(this).val();

    $.ajax({
      url: `/api/favorites/${selId}`,
      method: "DELETE"
    })
      .then(() => {
        location.reload();
      })
      .fail(err => {
        console.log(err);
      });
  });
});
