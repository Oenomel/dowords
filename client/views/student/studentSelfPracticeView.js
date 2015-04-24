
if(Meteor.isClient) {
	Template.studentSelfPracticeView.onRendered(function () {
		if(Session.get("userId").length === 0 || Session.get("userType") !== "student") {
			Router.go("/");
		}
		
		Meteor.call("getWordList", Session.get("selectedList"), function (err, res) {
			if(err) {
				alert("Error 013");
			}
			else {
				Session.set("wordList", JSON.parse(res[0].words));
				Session.set("cursor", 0);
				Session.set("listLength", Session.get("wordList").length);
				createQuiz();
			}
		});
		
		Session.set("time", 5);
		Session.set("timer", changeTime());
		
		$(".hiddenBtn").hide();
	});
	
	Template.studentSelfPracticeView.helpers({
		content : function () {
			return [Session.get("wordList")[Session.get("cursor")]];
		},
		
		cursor : function () {
			return Session.get("cursor") + 1;
		},
		
		length : function () {
			return Session.get("listLength");
		}
	});
	
	Template.studentSelfPracticeView.events({
		"click #exitSelfPracBtn" : function () {
			if(confirm("학습을 끝내시겠습니까?")) {
				Router.go("/viewList");
			}
			return;
		},
		
		"click .hiddenBtn" : function () {
			if(Session.equals("cursor", Session.get("listLength") - 1)) {
				var sel = confirm("마지막 단어입니다. 목록으로 돌아가시겠습니까?");
				
				if(sel) {
					Router.go("/viewList");
				}
				return;
			}
			
			createQuiz();
			Session.set("cursor", Session.get("cursor") + 1);
			Session.set("timer", changeTime());
		}
	});
}