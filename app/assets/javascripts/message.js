$(document).on('turbolinks:load', function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this); //フォームに入力した値を取得しています。
  })
});

$(function(){
  function buildHTML(message){
    var html = `<div class="message" data-id="${message.user_id}">
                  <div class="message__detail">
                    <p class="message__detail__current-user-name">
                      ${message.name}
                    </p>
                  </div>
                  <p class="message_body">
                    <div>
                    ${content}
                    </div>
                  </p>
                </div>`
  return html;}


  $('#new_mssage').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#message_content').val('')
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  })
});
function scrollBottom(){
  var target = $('.message').last();
  var position = target.offset().top + $('.messages').scrollTop();
  $('.messages').animate({
    scrollTop: position
  }, 300, 'swing');
}