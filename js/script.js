(function($) {
  var row = $('.route-card tbody tr').clone();

  function new_row() {
    $('.route-card tbody').append(row.clone());
  }

  new_row();

})(jQuery);
