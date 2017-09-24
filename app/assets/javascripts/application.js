// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$(function(){
  $( document ).ready().on('click', '#run', function(e){
    var auto_start = false;
    var count = 1;

    var cells = [];
    $('.active').each(function(){
      var col = parseInt($(this).attr('col'));
      var row = parseInt($(this).attr('row'));
      cells.push([row,col]);
    });

    (function loop() {
      e.preventDefault(); 

      if (window.clear) {
        window.clear = false;
        return false;
      }

      $.post('/start', {auto_start: auto_start, cells: cells});
      $('#run').addClass('disabled').text(count);
      count ++;
      setTimeout(function(){
        auto_start = true;
        loop();
     }, 1000); 
    }());
  });
});

$(function(){
  $( document ).ready().on('click', '.cell', function(){
    $('.clear').fadeIn();
    if($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
    }
    if($('.active').size() > 0){
      $('#run').removeClass('disabled');
    } else{
      $('#run').addClass('disabled');
    }
  });
});

$(function(){
  $( document ).ready().on('click', '.clear', function(){
    $(this).fadeOut();
    window.clear = true;
    $.post('/clear', {});
    $('#run').text("START");
  });
});
