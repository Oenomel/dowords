
if(Meteor.isClient) {
	Template.teacherHomeView.onRendered(function () {
		if(Session.equals("userType", "noType") || Session.equals("userType", "student")) {
			Router.go("/");
		}
		
		Meteor.call("getLastListDate", function (err, res) {
			if(err) {
				alert("Error 003");
			}
			else {
				if(res.indexOf("undefined") !== -1) {
					res = "등록된 목록이 없습니다.";
				}
				Session.set("lastListDate", res);
			}
		});
	});
	
	Template.teacherHomeView.helpers({
		count : function () {
			return 0;
		},
		
		lastListDate : function () {
			return Session.get("lastListDate");
		}
	});
	
	Template.teacherHomeView.events({
		"click #createNewListBtn" : function () {
			Router.go("/teacher/newList");
		},
		
		"click #viewListBtn" : function () {
			Router.go("/viewList");
		},
		
		"click #lastListDateBtn" : function () {
			Meteor.call("goLastListView", function (err, res) {
				if(err) {
					alert("Error 010");
				}
				else {
					if(res) {
						Session.set("fromHome", true);
						Session.set("selectedList", res[0]._id);
						Router.go("/viewList?list=" + res[0]._id);
					}
					else {
						return;
					}
				}
			});
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