(function($) {
  $('.route-card input').each(function() {
    $(this).val($(this).attr('value'));
  });

  var row = $('.route-card tbody tr').clone();
  row.find('.grid-ref input').prop('placeholder', 'To');

  function new_row() {
    $('.route-card tbody').append(row.clone());
  }

  function to_minutes(text) {
    var parts = text.split(':');
    if (parts.length == 1) {
      return parseInt(text, 10);
    } else {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
  }

  function to_time(minutes) {
    if (isNaN(minutes)) {
      return '';
    } else if (minutes < 60) {
      return "" + minutes;
    } else {
      return "" + parseInt(minutes / 60, 10) + ':' + ((minutes % 60) < 10 ? '0' : '') + (minutes % 60)
    }
  }

  $('.route-card').on('keyup', 'tr:last-child .grid-ref input', function(e) {
    if (this.validity.valid) {
      new_row();
      add_marker($(this).val());
    }
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
      var time = to_minutes($(this).val());
      total += time;
      $(this).closest('tr').find('.total-time').html(to_time(total));
    });
    $('.route-card tfoot .leg-time').html(to_time(total));
    $('.route-card tfoot .total-time').html(to_time(total));
    var plusten = parseInt(total/60);
    $('.route-card tfoot .plus-ten').html(to_time(plusten * 10));
    $('.route-card tfoot .full-total-time').html(to_time(total + plusten * 10));
  });

  new_row();

})(jQuery);
