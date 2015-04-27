
if(Meteor.isClient) {
	createCarousel = function (words) {
		for(var i=0; i<words.length; i++) {
			var item = $("<div class='item'></div>");
			var caption = $("<div class='carousel-caption'></div>");
			var engCont = $('<div class="engContainer">'+words[i].eng+'</div>');
			var korCont = $('<div class="engContainer">'+words[i].kor+'</div>');
			
			caption.append(engCont).append(korCont);
			item.append(caption);
			if(i === 0) {
				$(item).addClass("active");
			}
			$(".carousel-inner").append(item);
		}
		
		$(".carousel").carousel({
			interval : false
		});
	}
	
	sendChat = function () {
		var text = $(".chatInput").val();
		var time = new Date();
		var chat = {
			createTime : Session.get("createTime"),
			createTeacher : Session.get("createTeacher"),
			speaker : Session.get("userId"),
			profileName : Session.get("name"),
			chatText : $(".chatInput").val(),
			timeStamp : time.getTime()
		}
		
		Meteor.call("chatMethod", JSON.stringify(chat), function (err) {
			if(err) {
				alert("fail to send a message");
			}
		});
		
		$(".chatInput").val("");
	}
	
	chatObserver = function () {
		var handler = Chat.find().observe({
			added : function (chat) {
				if(Session.equals("createTeacher", chat.createTeacher) && Session.equals("createTime", chat.createTime)) {
					var chatText = $("<div class='chatText'><p>"+chat.profileName+" : "+chat.chatText+"</p></div>");
					$(chatText).data("username", chat.username);
					$(".chatContentContainer").append(chatText);
					$(".chatContentContainer").scrollTop($(".chatContentContainer")[0].scrollHeight);
				}
			}
		});
		
		return handler;
	}
}