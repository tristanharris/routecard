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

  $('.route-card tbody').on('keyup', '.distance input', function(e) {
    var total = 0;
    $('.route-card tbody .distance input').each(function() {
      var distance = parseFloat($(this).val(), 10);
      if (!isNaN(distance)) total += distance;
    });
    $('.route-card tfoot .distance').html(total);
  });

  $('.route-card tbody').on('keyup', '.height-gained input', function(e) {
    var total = 0;
    $('.route-card tbody .height-gained input').each(function() {
      var height = parseFloat($(this).val(), 10);
      if (!isNaN(height)) total += height;
    });
    $('.route-card tfoot .height-gained').html(total);
  });

  $('.route-card tbody').on('keyup', '.leg-time input', function(e) {
    var total = 0;
    $('.route-card tbody .leg-time input:not(:hidden)').each(function() {
      var time = parseFloat($(this).val(), 10);
      if (!isNaN(time)) total += time;
      $(this).closest('tr').find('.total-time').html(total);
    });
    $('.route-card tfoot .leg-time').html(total);
    $('.route-card tfoot .total-time').html(total);
  });

  new_row();

})(jQuery);
