var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
};

$(".desktopsearch").keydown(function (event) {
  if (event.keyCode == 13) {
    if ($(".desktopsearch").val().length > 0) {
      var base_url = window.location.origin;
      window.location.replace(

        base_url + "/product-listing/search?q=" + $(".desktopsearch").val()
      );
      //return false;
    }
  }
});

$(".desktopsearch").val(getUrlParameter('q'));

$(".desktopsearch")
  .autocomplete({
    delay: 100,
    minLength: 1,
    source: function (request, response) {
      $.ajax({
        type: "GET",
        dataType: "JSON",
        url: APIURL + "/search?q=" + request.term,
        contentType: "application/json",
        success: function (data) {
          response(
            $.map(data.results.response, function (item) {
              // if (item.type != "brand") {
              return {
                label: item.name,
                value: item.name,
                desc: item.type,
                id: item.id,
                main_id: item.main_cat_id
              };
              // }
            })
          );
        },
        error: function (data) { }
      });
    },
    select: function (event, ui) {
      var base_url = window.location.origin;
      d = ui.item;
        switch (d.desc) {
          case "product":
            window.location.replace(
              base_url +
              "/product-detail/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
            );
            break;
          case "brand":
            window.location.replace(
              base_url + "/product-listing/" + "#!?brand=" + d.id
            );
            break;
          case "bundle":
            window.location.replace(
              base_url +
              "/bundle-detail/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
            );
            break;
          case "category":
            window.location.replace(
              base_url +
              "/product-listing/" +
              d.id +
              "/" +
              d.value.replace(/\s+/g, "-")
            );
            break;
          case "sub-category":
            window.location.replace(
              base_url +
              "/product-listing/" +
              d.main_id +
              "/" +
              d.value.replace(/\s+/g, "-") +
              "#!?sub_cat=" +
              d.id
            );
            break;
        }
      }
  })
  .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append(
        "<div class='cusui'><b>" +
        item.label +
        "</b><br><small> - " +
        item.desc +
        "</small></div>"
      )
      .appendTo(ul);
  };
$("#searchLblm")
  .autocomplete({
    delay: 100,
    minLength: 1,
    source: function (request, response) {
      $.ajax({
        type: "GET",
        dataType: "JSON",
        url: APIURL + "/search?q=" + request.term,
        contentType: "application/json",
        success: function (data) {
          response(
            $.map(data.results.response, function (item) {
              // if (item.type != "brand") {
              return {
                label: item.name,
                value: item.name,
                desc: item.type,
                id: item.id,
                main_id: item.main_cat_id
              };
              // }
            })
          );
        },
        error: function (data) { }
      });
    },
    select: function (event, ui) {
      var base_url = window.location.origin;
      d = ui.item;
      switch (d.desc) {
        case "product":
          window.location.replace(
            base_url +
            "/product-detail/" +
            d.id +
            "/" +
            d.value.replace(/\s+/g, "-")
          );
          break;
        case "brand":
          window.location.replace(
            base_url + "/product-listing/" + "#!?brand=" + d.id
          );
          break;
        case "bundle":
          window.location.replace(
            base_url +
            "/bundle-detail/" +
            d.id +
            "/" +
            d.value.replace(/\s+/g, "-")
          );
          break;
        case "category":
          window.location.replace(
            base_url +
            "/product-listing/" +
            d.id +
            "/" +
            d.value.replace(/\s+/g, "-")
          );
          break;
        case "sub-category":
          window.location.replace(
            base_url +
            "/product-listing/" +
            d.main_id +
            "/" +
            d.value.replace(/\s+/g, "-") +
            "#!?sub_cat=" +
            d.id
          );
          break;
      }
    },
    close: function (event, ui) {
      if (!event.keyCode || event.keyCode === 13) {

      }
    }
  })
  .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append(
        "<div class='cusui'><b>" +
        item.label +
        "</b><br><small> - " +
        item.desc +
        "</small></div>"
      )
      .appendTo(ul);
  };
