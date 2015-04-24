
if(Meteor.isClient) {
	
	Template.studentDoPracticeView.onRendered(function () {
		if(Session.get("userType") !== "student" || Session.get("userId").length === 0) {
			Router.go("/");
		}
		
		Session.set("doPractice", false);
		$("#studentDoPracticeExitBtn").hide();
	});
	
	Template.studentDoPracticeView.helpers({
		contents : function () {
			var cont = [];
			var view = ViewWord.findOne({createTeacher : Session.get("teacher")});
			
			if(view.status == null || view.status === "finish") {
				cont.push({eng : "잠시만 기다려 주세요", kor : ""});
				$("#studentDoPracticeExitBtn").show();
				Session.set("doPractice", false);
			}
			else {
				cont.push({eng : view.eng, kor : view.kor});
				$("#studentDoPracticeExitBtn").hide();
				Session.set("doPractice", true);
			}
			return cont;
		}
	});
	
	Template.studentDoPracticeView.events({
		"click #exitSelfPracBtn" : function () {
			if(Session.equals("doPractice", false)) {
				Router.go("/student");
			}
		}
	});
}