
if(Meteor.isClient) {
	Template.teacherDoPracticeView.onRendered(function () {
		if(Session.get("userId").length === 0 || !Session.equals("userType", "teacher")) {
			Router.go("/");
		}
		
		Session.set("cursor", 0);
		Meteor.call("initDoPractice", Session.get("userId"), Session.get("selectedList"), function (err, res) {
			if(err) {
				alert("Error 008");
			}
			else {
				Session.set("listLength", res.len);
				Session.set("words", res.words);
				Session.set("createTeacher", res.createTeacher);
				Session.set("createTime", res.createTime);
				
				createCarousel(JSON.parse(res.words));
			}
		});
	});
	
	Template.teacherDoPracticeView.helpers({
		cursor : function () {
			return Session.get("cursor") + 1;
		},
		
		length : function () {
			return Session.get("listLength");
		}
	});
	
	Template.teacherDoPracticeView.events({		
		"click .left" : function () {
			if(Session.equals("cursor", 0)) {
				return;
			}
			
			Meteor.call("viewAnotherWord", Session.get("createTeacher"), Session.get("selectedList"), Session.get("cursor")-1, function (err, res) {
				if(err) {
					alert("Error 006");
				}
				else {
					Session.set("cursor", Session.get("cursor") - 1);
					$(".carousel").carousel("prev");
				}
			});
		},
		
		"click .right" : function () {
			if(Session.equals("cursor", Session.get("listLength") -1)) {
				var sel = confirm("마지막 단어입니다. 목록으로 돌아가시겠습니까?");
				
				if(sel) {
					ViewWord.update({_id : ViewWord.findOne()._id}, {$set : {status : "finish"}});
					Router.go("/viewList?list=" + Session.get("selectedList"));
				}
				return;
			}
			
			Meteor.call("viewAnotherWord", Session.get("createTeacher"), Session.get("selectedList"), Session.get("cursor")+1, function (err, res) {
				if(err) {
					alert("Error 007");
				}
				else {
					if(res) {
						Session.set("cursor", Session.get("cursor") + 1);
						$(".carousel").carousel("next");
					}
				}
			});
		},
		
		"click .viewAndHidChatBtn" : function () {
			if($(".viewAndHidChatBtn").data("hide")) {
				$(".chatContainer").animate({height : "250px"}, 150, function () {
					$(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
					$(".viewAndHidChatBtn").data("hide", false);
				});
			}
			else {
				$(".chatContainer").animate({height : "0px"}, 150, function () {
					$(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
					$(".viewAndHidChatBtn").data("hide", true);
				});
			}
		},
		
		"click .sendBtn" : function () {
			sendChat();
		}
	});
}