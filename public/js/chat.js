import {
    Service
} from './service/service.js';
$(document).ready(function () {
    const service = new Service();

    function addMsg(message) {
        var html = `<li>
                        <div class="message-data">
                          <span class="message-data-name">${message.username}</span>
                          <span class="message-data-time">${message.date}</span>
                        </div>
                        <div class="message my-message" dir="auto">${message.messageContent}</div>
                      </li>`;
        $(html).hide().appendTo('.chat-history ul').slideDown(200);

        // Keep scroll bar down
        $(".chat-history").animate({
            scrollTop: $('.chat-history')[0].scrollHeight
        }, 10);
    }

    function insertMsg(username) {
        const textareaEle = $("textarea[name='message']");
        const messageContent = textareaEle.val().trim();
        if (messageContent !== '') {
            var message = {
                messageContent,
                username,
                date: Date.now()
            };

            service.emit('newMsg', message);
            textareaEle.val('');
        }
    }

    function loadUsers({
        users,
        userName
    }) {
        $('.container p.message').remove();
        let html = '';
        for (const user in users) {
            
            if (document.querySelector(`#user${users[user].socket}`)) continue
            html += `<li class="clearfix" id="user${users[user].socket}">
                         <div class="about">
                            <div class="name">${user}</div>
                            <div class="status"><i class="fa fa-circle online"></i> online</div>
                         </div></li>`;
        }

        if (html === '') {
            return;
        }

        $('.users-list ul').prepend(html);
        $(".chat-message button").on('click', function() {
            insertMsg(userName)
        });
        const txta = $("textarea[name='message']");
        txta.keydown(function (e) {
            if (e.keyCode == 13) {
                insertMsg(userName)
            };
        });
    }
    const userName = prompt("Input your user");

    service.on("updateUsers", loadUsers);

    service.emit("newUser", {
        userName
    });


    service.on("renderMsg", addMsg);
    service.on('removeUser', function(userId) {
        $('li#user' + userId).remove();
        service.emit("updateUsers");
      });
})

window.onload = function () {




}