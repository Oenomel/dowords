
if(Meteor.isClient) {
	Template.studentInputInfoView.onRendered(function () {
		if(Session.equals("userType", "noType")) {
			Router.go("/");
		}
	});
	
	Template.studentInputInfoView.events({
		"click #loginBtn" : function () {
			var guestName = $("[name='inputName']").val();
			if(guestName.length === 0) {
				alert("input your name");
			}
			else {
				Session.set("guestName", guestName);
				Router.go("/student");
			}
		},
		
		"click #backBtn" : function () {
			Session.set("userType", "noType");
			Router.go("/");
		}
	});
}