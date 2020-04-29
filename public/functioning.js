$(document).ready(function () {
  $(".card-header .fa-chevron-circle-down").on("click", function () {
    $(this).parent().parent().parent().children(".card-body").slideToggle(30);
  });
  $("footer p").text("Designed and Maintained by Rahul Mohata");
});
