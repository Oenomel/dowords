
if(Meteor.isClient) {
	Template.wordListView.onRendered(function () {
		Meteor.call("getWordList", Session.get("selectedList"), function (err, res) {
			if(err) {
				alert("Error 005");
			}
			else {
				Session.set("listDate", dateToString(res[0].timeStamp));
				var memo = res[0].memo;
				if(memo.length === 0) {
					memo = "---";
				}
				Session.set("listMemo", memo);
				Session.set("words", JSON.stringify(res[0].words));
			}
		});
	});
	
	Template.wordListView.helpers({
		listDate : function () {
			return Session.get("listDate");
		},
		
		listMemo : function () {
			return Session.get("listMemo");
		},
		
		words : function () {
			return JSON.parse(JSON.parse(Session.get("words")));
		}
	});
	
	Template.wordListView.events({
		"click #backBtn" : function () {
			Session.set("selectedList", "");
			Session.set("listDate", "");
			Session.set("listMemo", "");
			Session.set("words", "");
			
			if(Session.get("fromHome") != null && Session.equals("fromHome", true)) {
				Session.set("fromHome", false);
				Router.go("/teacher");
				return;
			}
			
			Router.go("/teacher/viewList");
		},
		
		"click #doBtn" : function () {
			var select = window.confirm("학습을 시작합니다.");
			
			if(select) {
				Router.go("/teacher/doPractice");
			}
		}
	});
}