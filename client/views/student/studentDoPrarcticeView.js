
if(Meteor.isClient) {
	
	Template.studentDoPracticeView.onRendered(function () {
		if(Session.get("userId").length === 0 || Session.get("userType") !== "student") {
			Router.go("/");
		}
		
		Session.set("doPractice", false);
		Session.set("createTime", 0);
		Session.set("createTeacher", Session.get("teacher"));
		$("#studentDoPracticeExitBtn").hide();
	});
	
	Template.studentDoPracticeView.helpers({
		contents : function () {
			var cont = [];
			var view = ViewWord.findOne({createTeacher : Session.get("teacher")});
			var handler = null;
			
			if(view.status == null || view.status === "finish") {
				cont.push({eng : "잠시만 기다려 주세요", kor : ""});
				$("#studentDoPracticeExitBtn").show();
				Session.set("doPractice", false);
				$(".chatContentContainer").empty();
			}
			else {
				cont.push({eng : view.eng, kor : view.kor});
				$("#studentDoPracticeExitBtn").hide();
				Session.set("doPractice", true);
				
				if(Session.equals("createTime", 0)) {
					Session.set("createTime", view.createTime);					
				}
				else if(!Session.equals("createTime", view.createTime)) {
					Session.set("createTime", view.createTime);
					chatObserver();
				}
			}
			return cont;
		}
	});
	
	Template.studentDoPracticeView.events({
		"click #exitSelfPracBtn" : function () {
			if(Session.equals("doPractice", false)) {
				Router.go("/student");
			}
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