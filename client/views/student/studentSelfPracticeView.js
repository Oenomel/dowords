
if(Meteor.isClient) {
	Template.studentSelfPracticeView.onRendered(function () {
		if(Session.get("userType") !== "student" || Session.get("userId").length === 0) {
			Router.go("/");
		}
		
		Meteor.call("getSelectedList", Session.get("selectedList"), function (err, res) {
			if(err) {
				alert("Error 013");
			}
			else {
				Session.set("wordList", res);
				Session.set("cursor", 0);
				Session.set("listLength", JSON.parse(res).length)
				createQuiz();
			}
		});
		
		Session.set("time", 5);
		Session.set("timer", changeTime());
		
		$(".hiddenBtn").hide();
	});
	
	Template.studentSelfPracticeView.helpers({
		word : function () {
			var word = JSON.parse(Session.get("wordList"))[Session.get("cursor")];
			return word.eng;
		},
		
		mean : function () {
			var word = JSON.parse(Session.get("wordList"))[Session.get("cursor")];
			return word.kor;
		}
	});
	
	Template.studentSelfPracticeView.events({
		"click #exitSelfPracBtn" : function () {
			if(confirm("학습을 끝내시겠습니까?")) {
				Router.go("/viewList");
			}
			return;
		},
		
		"click #nextBtn" : function () {
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