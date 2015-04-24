
if(Meteor.isClient) {	
	Template.teacherDoPracticeView.onRendered(function () {
		Session.set("cursor", 0);
		Meteor.call("getListLength", Session.get("selectedList"), function (err, res) {
			if(err) {
				alert("Error 008");
			}
			else {
				Session.set("listLength", res.len);
				Session.set("eng", res.eng);
				Session.set("kor", res.kor);
			}
		});
	});
	
	Template.teacherDoPracticeView.helpers({
		word : function () {
			return Session.get("eng");
		},
		
		mean : function () {
			return Session.get("kor");
		},
		
		cursor : function () {
			return Session.get("cursor") + 1;
		},
		
		length : function () {
			return Session.get("listLength");
		}
	});
	
	Template.teacherDoPracticeView.events({		
		"click #prevBtn" : function () {
			if(Session.equals("cursor", 0)) {
				return;
			}	
			Meteor.call("viewAnotherWord", Session.get("selectedList"), Session.get("cursor")-1, function (err, res) {
				if(err) {
					alert("Error 006");
				}
				else {
					Session.set("cursor", Session.get("cursor") - 1);
					Session.set("eng", res.eng);
					Session.set("kor", res.kor);
				}
			});
		},
		
		"click #nextBtn" : function () {
			if(Session.equals("cursor", Session.get("listLength") -1)) {
				var sel = confirm("마지막 단어입니다. 목록으로 돌아가시겠습니까?");
				
				if(sel) {
					ViewWord.update({_id : ViewWord.findOne()._id}, {$set : {status : "finish"}});
					Router.go("/viewList?list=" + Session.get("selectedList"));
				}
				return;
			}
			
			Meteor.call("viewAnotherWord", Session.get("selectedList"), Session.get("cursor")+1, function (err, res) {
				if(err) {
					alert("Error 007");
				}
				else {
					if(res) {
						Session.set("cursor", Session.get("cursor") + 1);
						Session.set("eng", res.eng);
						Session.set("kor", res.kor);
					}	
				}
			});
		}	
	});
}