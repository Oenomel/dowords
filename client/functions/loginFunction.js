
if(Meteor.isClient) {
	loginFunction = function () {
		var id = $("input[name='memberId']").val();
		var pw = $("input[name='memberPw']").val();		
		var user = {username : id}
		
		Meteor.loginWithPassword(user, pw, function (err) {		
			if(!err) {
				checkUserType(id);
			}
			else {
				alert("Wrong ID or PW!");
				$("input[name='memberId']").val("").focus();
				$("input[name='memberPw']").val("");
			}
		});	
	}
	
	checkUserType = function (id) {
		Meteor.call("checkUserType", id, function (err, res) {
			if(err) {
				alert("Error 011");
				return;
			}
			else {
				Session.set("userType", res.userType);
				Session.set("name", res.name);
				Session.set("userId", id);
				Router.go("/"+res);
			}
		});
	}
}