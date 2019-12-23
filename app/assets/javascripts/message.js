$(function(){
   function buildHTML(message){
    var text = message.content ? message.content : '';
    var image = message.image.url ? `<img alt="test" src="${message.image.url}" width="200" height="132" style="margin-top: 10px;" >` : '';
    
    var html = `<div class="message" data-id='${message.id}'>
      <div class="upper-message__user-name">
        ${message.user_name}
    </div>
    <div class="upper-message__date">
      ${message.created_at}
    </div>
    <div class="lower-message">
      ${text}
    </div>
    <div>
      ${image}
    </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
  
    var formData = new FormData(this)
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message').get(0).reset();
      
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(":submit").removeAttr("disabled");
    });
  })
})


