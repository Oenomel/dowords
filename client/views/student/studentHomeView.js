
if(Meteor.isClient) {
	Template.teacherHomeView.onRendered(function () {
		if(Session.equals("userType", "noType") || Session.equals("userType", "teacher")) {
			Router.go("/");
		}
		Session.set("ready", false);
	});
	
	Template.studentHomeView.helpers({
		name : function () {
			return Session.get("name");
		},
		
		status : function () {
			var view = ViewWord.findOne();
			
			if(view.status != null && view.status === "finish") {
				return "gray";
			}
			else {
				Session.set("ready", true);
				return "black";
			}
		}
	});
	
	Template.studentHomeView.events({
		"click #startPracticeBtn" : function () {
			if(Session.equals("ready", true)) {
				confirm("학습을 시작 하시겠습니까?");
			}
			else {
				alert("잠시 기다려 주세요~!");
			}
		},
		
		"click #goListPageBtn" : function () {
			Router.go("/viewList");
		},
		
		"click #logoutBtn" : function () {
			Meteor.logout(function (err) {
				if(err) {
					alert("로그 아웃 중 문제가 발생했습니다.");
				}
			});
			Session.set("userType", "noType");
			Router.go("/");
		}
	});
}