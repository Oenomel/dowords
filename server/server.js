
if(Meteor.isServer) {
	Meteor.startup(function() {
		if(Users.find().count() === 0) {
			Accounts.createUser({
				username : "admin",
				eamail : "",
				password : "admin",
				profile : {
					userType : "teacher",
					grade : 6,
					class : 1,
					name : "ADMIN",
					teacher : "none"
				}
			});
			

			
			Accounts.createUser({
				username : "stu1",
				eamail : "",
				password : "stu1",
				profile : {
					userType : "student",
					grade : 6,
					class : 1,
					name : "stu1",
					teacher : Users.findOne({"profile.userType" : "teacher", "profile.grade" : 6, "profile.class" : 1})._id
				}
			});
			
			console.log("create users");
		}
		
		if(ViewWord.find().count() !== 0) {
			ViewWord.update({_id : ViewWord.findOne()._id}, {$set : {status : "finish"}});
		}
		
		Meteor.publish("viewWord", function () {
			return ViewWord.find();
		});
	});
}
