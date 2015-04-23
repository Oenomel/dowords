
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
					name : "ADMIN"
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
					name : "stu1"
				}
			});
			
			console.log("create admin");
		}
		
		if(ViewWord.find().count() !== 0) {
			ViewWord.update({_id : ViewWord.findOne()._id}, {$set : {status : "finish"}});
		}
		else {
			ViewWord.insert({eng : "", kor : "", status : "finish"});
		}
		
		Meteor.publish("viewWord", function () {
			return ViewWord.find();
		});
	});
}
