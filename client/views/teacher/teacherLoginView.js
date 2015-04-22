
if(Meteor.isClient) {
	
	Template.teacherLoginView.onRendered(function () {
		if(Session.equals("userType", "noType")) {
			Router.go("/");
		}
	});
	
	Template.teacherLoginView.events({
		"click #loginBtn" : function () {
			loginFunction();
		},
		
		"keydown [name='memberPw']" : function (evt) {
			if(evt.keyCode === 13) {
				loginFunction();
			}
		},
		
		"click #backBtn" : function () {
			Session.set("userType", "noType");
			Router.go("/");
		}
	});
}