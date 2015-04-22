
if(Meteor.isServer) {
	Meteor.startup(function() {
		if(Members.find().count() === 0) {
			Members.insert({id : "admin", pw : "admin", type : "teacher", useYn : "y"});
		}
		
		if(ViewWord.find().count() !== 0) {
			ViewWord.update({_id : ViewWord.findOne()._id}, {$set : {status : "finish"}});
		}
		
		Meteor.publish("viewWord", function () {
			return ViewWord.find();
		});
	});
}