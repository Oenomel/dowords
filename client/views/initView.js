
if(Meteor.isClient) {
	Template.initView.onRendered(function () {
		resetSession();
	})
	
	Template.initView.events({
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