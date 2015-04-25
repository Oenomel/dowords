
if(Meteor.isClient) {
	Template.wordListView.onRendered(function () {
		if(Session.get("userId").length === 0 || !Session.equals("userType", "teacher")) {
			Router.go("/");
		}
		
		$(".inputWrapper").hide();
		
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
				Session.set("words", res[0].words);
				Session.set("originWords", res[0].words);
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
			if(Session.get("words").length !== 0) {
				return JSON.parse(Session.get("words"));
			}
			else {
				return [];
			}
		}
	});
	
	Template.wordListView.events({
		"click .wordContainer" : function (evt) {
			showInputWrapper(evt);		
		},
		
		"click #insertNewWordBtn" : function () {
			$(".inputWrapper").fadeIn();
		},
		
		"click #addWordBtn" : function () {
			addWordContainer();
		},
		
		"click #removeWordBtn" : function () {
			removeWordContainer();
		},
		
		"click #modifyWordBtn" : function () {
			modifyWordContainer();
		},
		
		"click #cancelWordBtn" : function () {
			$("input[name='inputText']").val("");
			$(".inputWrapper").fadeOut();
			finishModifyWordContainer();
		},
		
		"click #backBtn" : function () {
			if(!Session.equals("words", Session.get("originWords"))) {
				saveChangedWordList();
			}
			
			Session.set("selectedList", "");
			Session.set("listDate", "");
			Session.set("listMemo", "");
			Session.set("words", "");
			
			if(Session.get("fromHome") != null && Session.equals("fromHome", true)) {
				Session.set("fromHome", false);
				Router.go("/teacher");
				return;
			}
			
			Router.go("/viewList");
		},
		
		"click #doBtn" : function () {
			var select = window.confirm("학습을 시작합니다.");
			
			if(select) {
				if(!Session.equals("words", Session.get("originWords"))) {
					saveChangedWordList();
				}
				Router.go("/teacher/doPractice");
			}
		}
	});
}