
if(Meteor.isClient) {
	
	Template.studentHomeView.onRendered(function () {
		if(Session.get("userId").length === 0 || Session.get("userType") !== "student") {
			Router.go("/");
		}
		
		Session.set("isReady", "준비중 입니다.");
		
		Meteor.call("readyToPractice", Session.get("teacher"), function (err, res) {
			if(err) {
				alert("Error 012");
			}
			else {
				if(res) {
					Session.set("isReady", "학습을 시작합니다.");
					$("#startPracticeBtn").removeClass("btn-danger").addClass("btn-success");
				}
				else {
					Session.set("isReady", "준비중 입니다.");
					$("#startPracticeBtn").removeClass("btn-success").addClass("btn-danger");
				}
			}
		});

		var cursor = ViewWord.find({createTeacher : Session.get("teacher")});
		var handler = cursor.observeChanges({
			changed : function (id, word) {
				if(word.status === "finish") {
					Session.set("isReady", "준비중 입니다.");
				}
				else {
					Session.set("isReady", "학습을 시작합니다.");
				}
			}
		});
	});
	
	Template.studentHomeView.helpers({
		practiceStatus : function () {
			if(Session.equals("isReady", "학습을 시작합니다.")) {
				$("#startPracticeBtn").removeClass("btn-danger").addClass("btn-success");
			}
			else {
				$("#startPracticeBtn").removeClass("btn-success").addClass("btn-danger");
			}
			return Session.get("isReady");
		}
	});
	
	Template.studentHomeView.events({
		"click #startPracticeBtn" : function () {
			if(Session.equals("isReady", "학습을 시작합니다.")) {
				if(confirm("학습을 시작 하시겠습니까?")) {
					Router.go("/student/doPractice");
				}
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