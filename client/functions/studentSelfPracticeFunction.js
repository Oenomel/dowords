
if(Meteor.isClient) {
	createQuiz = function () {
		var which = Math.floor(Math.random() * 2);
		$(".hiddenBtn").hide();
		
		if(which) {
			$("#engContainer").addClass("hideWord");
		}
		else {
			$("#korContainer").addClass("hideWord");
		}
		
		$("#engContainer").text(Session.get("wordList")[Session.get("cursor")].eng);
		$("#korContainer").text(Session.get("wordList")[Session.get("cursor")].kor);
	}
	
	showAnswer = function () {
		$(".hideWord").fadeIn(300);
		$(".hideWord").removeClass("hideWord");
	}
	
	changeTime = function () {	
		var timer = Meteor.setInterval(function () {
			var time = Session.get("time") - 1;			
			Session.set("time", time);
			
			if(time === 0) {
				stopTimer(Session.get("timer"));
			}
		}, 1000);
		
		return timer;
	}
	
	stopTimer = function (timer) {
		Meteor.clearInterval(timer);
		$(".hiddenBtn").show();
		$(".hideWord").removeClass("hideWord");
		Session.set("time", 5);
	}
}