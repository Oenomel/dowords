
if(Meteor.isClient) {
	Template.viewListView.onRendered(function () {
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
		"click .listBtn" : function () {
			Router.go("/teacher");
		},
		
		"click .listItem" : function (evt) {
			Session.set("selectedList", evt.currentTarget.id);
			Router.go("/teacher/viewList?list=" + evt.currentTarget.id);
		}
	});
}