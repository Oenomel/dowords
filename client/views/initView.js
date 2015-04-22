
if(Meteor.isClient) {
	
	Template.initView.events({
		"click #teacherUser span, click #teacherUser img" : function () {
			Session.set("userType", "teacher");
			Router.go("/teacher");
		},
		
		"click #studentUser span, click #studentUser img" : function () {
			Session.set("userType", "student");
			Router.go("/student");
		}
	});
}