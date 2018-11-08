var getUrlParameter = function getUrlParameter(param, dummyPath) {
  var sPageURL = dummyPath || window.location.search.substring(1),
    sURLVariables = sPageURL.split(/[&||?]/),
    res;

  for (var i = 0; i < sURLVariables.length; i += 1) {
    var paramName = sURLVariables[i],
      sParameterName = (paramName || '').split('=');

    if (sParameterName[0] === param) {
      res = sParameterName[1];
    }
  }

  return res;
}


$('.searchicon').on('click',function(e){
if($(".desktopsearch").val() != "" && $(".desktopsearch").val().length > 2){
  var base_url = window.location.origin;
      window.location.replace(

        base_url + "/product-listing/search?q=" + encodeURIComponent($(".desktopsearch").val())
  );
}else{
  return false;
}

})

$(".desktopsearch").keydown(function (event) {
  if (event.keyCode == 13) {
    if ($(".desktopsearch").val().length > 0) {
      var base_url = window.location.origin;
      window.location.replace(

        base_url + "/product-listing/search?q=" + encodeURIComponent($(".desktopsearch").val())
      );
      //return false;
    }
  }
});

if (getUrlParameter('q')) {
  $(".desktopsearch").val(decodeURIComponent(getUrlParameter('q')));
}

$(".desktopsearch")
  .autocomplete({
    delay: 100,
    minLength: 3,
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
        "</b></div>"
      )
      .appendTo(ul);
  };
$("#searchLblm")
  .autocomplete({
    delay: 100,
    minLength: 3,
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
