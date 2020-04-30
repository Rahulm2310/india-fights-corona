$(document).ready(function () {
  let theme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/superhero/bootstrap.min.css";

  $("#bootswatch-link").attr({
    href: theme,
  });

  $(".card-header .fa-chevron-circle-down").on("click", function () {
    $(this).parent().parent().parent().children(".card-body").slideToggle(30);
  });
  $("footer p").text("Designed and Maintained by Rahul Mohata");

  $(".theme-default").on("click", function () {
    theme =
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/superhero/bootstrap.min.css";
    $("#bootswatch-link").attr({
      href: theme,
    });
    localStorage.setItem("theme", theme);
  });
  $(".theme-light").on("click", function () {
    theme =
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/flatly/bootstrap.min.css";
    $("#bootswatch-link").attr({
      href: theme,
    });
    localStorage.setItem("theme", theme);
  });

  $(".theme-gunmetal").on("click", function () {
    theme =
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/darkly/bootstrap.min.css";
    $("#bootswatch-link").attr({
      href: theme,
    });
    localStorage.setItem("theme", theme);
  });
  $(".theme-dark").on("click", function () {
    theme =
      "https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/cyborg/bootstrap.min.css";
    $("#bootswatch-link").attr({
      href: theme,
    });
    localStorage.setItem("theme", theme);
  });
});
