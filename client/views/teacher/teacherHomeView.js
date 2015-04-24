
if(Meteor.isClient) {
	Template.teacherHomeView.onRendered(function () {
		if(Session.get("userId").length === 0 || !Session.equals("userType", "teacher")) {
			Router.go("/");
		}
		
		Meteor.call("getLastList", function (err, res) {
			if(err) {
				alert("Error 003");
			}
			else {
				if(res._id === "none") {
					res.date = "등록된 목록이 없습니다.";
				}
				Session.set("lastListDate", res.date);
				$("#lastListDateBtn").data("list_id", res._id);
			}
		});
	});
	
	Template.teacherHomeView.helpers({
		name : function () {
			return Session.get("name");
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
		
		"click #lastListDateBtn" : function (evt) {
			var _id = $(evt.currentTarget).data("list_id");
			if(_id !== "none") {
				Session.set("fromHome", true);
				Session.set("selectedList", _id);
				Router.go("/viewList?list=" + _id);
			}
			else {
				return;
			}
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