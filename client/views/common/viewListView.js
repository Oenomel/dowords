
if(Meteor.isClient) {
	Template.viewListView.onRendered(function () {
		if(Session.get("userId").length === 0 || Session.equals("userType", "noType")) {
			Router.go("/");
		}
		
		Meteor.call("getLists", function (err, res) {
			if(err) {
				alert("Error 004");
			}
			else {
				setListViewFunction(res);
			}
		});
	});
	
	Template.viewListView.events({
		"click .btn" : function () {
			Router.go("/"+Session.get("userType"));
		},
		
		"click .listItem" : function (evt) {
			Session.set("selectedList", evt.currentTarget.id);

			if(Session.equals("userType", "student") && !window.confirm("해당 목록의 학습을 시작 하시겠습니까?")) {
				return;
			}
			Router.go("/viewList?list=" + evt.currentTarget.id);
		}
	});
}