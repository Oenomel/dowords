
if(Meteor.isClient) {
	Template.studentHomeView.helpers({
		name : function () {
			return Session.get("name");
		}
	});
}