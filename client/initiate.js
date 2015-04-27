
if(Meteor.isClient) {

	Meteor.startup(function () {
		Session.setDefault("userType", "noType");
		Session.setDefault("userId", "");
	});
	
	Meteor.subscribe("viewWord");
	Meteor.subscribe("chat");
	
	chatOb = chatObserver();
}