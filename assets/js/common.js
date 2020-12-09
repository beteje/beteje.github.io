$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
    $('.navbar-nav').find('a').removeClass('waves-effect waves-light');
    $(".btn-expand").click(function(){
      if (!$(this).data("openAll")) {
          $(".collapse").collapse("show");
      }
      else {
          $(".collapse").collapse("hide");
      }
      // save last state
      $(this).data("openAll",!$(this).data("openAll"));
    });
});
