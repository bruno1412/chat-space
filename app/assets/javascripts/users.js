$(function() { 
  
  var search_list = $("#user-search-result");
  
  function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>`;
    search_list.append(html);
  } 
  function appendNoUser(user) {
  var html = `<div class="chat-group-user clearfix">
              <p>${user}</p>
             </div>`;                
     search_list.append(html);
  } 
  function appendAddUser(id,name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html
  }
  $('#user-search-field').on('keyup', function() {  
    var input = $("#user-search-field").val(); 
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致する名前がありません");
      }
    }) 
    .fail(function() {
      alert('検索に失敗しました');
    });
  }); 
   $("#user-search-result").on('click', '.user-search-add', function() {  
      var name = $(this).data('user-name');
      var id = $(this).data('user-id');
      var html = appendAddUser(id,name)
      $("#chat-group-users").append(html);
      $(this).parent().remove();
   });
  
   $("#chat-group-users").on('click', '.user-search-remove', function(){
      $(this).parent().remove();
   });   
});