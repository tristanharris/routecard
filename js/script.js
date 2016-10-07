(function($) {
  $('.route-card input').each(function() {
    $(this).val($(this).attr('value'));
  });

  var row = $('.route-card tbody tr').clone();

  function new_row() {
    $('.route-card tbody').append(row.clone());
  }

  $('.route-card').on('keydown', 'tr:last-child .grid-ref input', function(e) {
    new_row();
  });

  new_row();

})(jQuery);
