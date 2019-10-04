$(function() {
  function createImage(message){
    if(message.image.url == null){
      return ``
    } else {
      return `<img class="lower-message__image" src='${message.image.url}'></img>`
    }
  }

  function buildMessage(message){  
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message__upper">
                      <div class="upper__name">
                        ${message.user_name}
                      </div>
                      <div class="upper__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message-text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${createImage(message)}  
                  </div>`
    return html
  }

  $("#new_message").on('submit',function(){
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message)
      $('div').animate({scrollTop: $('.messages').height()})
      $('.messages').append(html)
      $('form')[0].reset();
    })
    .fail(function(){
      alert('messageか画像を入力してください')
    })
    
    return false;
  })
  
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    }
  };
  setInterval(reloadMessages, 5000);
});