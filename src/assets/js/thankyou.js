function showresult() {
  $(document).ready(function () {
    $(".loadingresult").css("display", "grid");
    // Retrieve values from localStorage
    var storedFirstName = localStorage.getItem("firstName");
    var storedLastName = localStorage.getItem("lastName");
    var completeName = storedFirstName + " " + storedLastName;
    if (completeName != null) {
      // Update HTML elements with the retrieved values
      $("#completeName").text(completeName);
      $("#otorgado").text("Otorgado a: ")
    } else {
      console.log("No hay registro de esta persona");
    }
    setTimeout(function () {
      $(".thankyou-page").addClass("thankyou_show");
      $("section").css("display", "none");
    }, 1000);
  });
}
