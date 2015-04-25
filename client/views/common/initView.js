
if(Meteor.isClient) {
	Template.initView.onRendered(function () {
		resetSession();
	})
	
	Template.initView.events({
		"click #loginBtn" : function () {
			loginFunction();
		},
		
		"click #studentLoginBtn" : function () {
			studentLoginFunction();
		},
		
		"keydown [name='memberPw']" : function (evt) {
			if(evt.keyCode === 13) {
				loginFunction();
			}
		}
	});
}