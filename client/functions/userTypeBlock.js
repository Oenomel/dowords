
if(Meteor.isClient) {
	checkUserAuth = function () {
		Meteor.call("checkUserAuth", Session.get("userType"), function (err, res) {
			if(err) {
				alert("Sorry, the server has some problem!");
				resetSession();
				Router.go("/");
			}
			else {
				if(!res) {
					alert("Session changed!");
					resetSession();
					Router.go("/");
				}
			}
		})
	},
	
	resetSession = function () {
		var keys = Session.keys;		
		for(var i=0; i<keys.length; i++) {
			delete Session.keys[i];
		}
		
		Session.set("userType", "noType");
		Session.set("userId", "");
	}
}