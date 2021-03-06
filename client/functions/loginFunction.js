
if(Meteor.isClient) {
	loginFunction = function () {
		var id = $("input[name='memberId']").val();
		var pw = $("input[name='memberPw']").val();		
		var user = {username : id.toLowerCase()}
		
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
	
	studentLoginFunction = function () {
		var user = {username : "stu1"}
		
		Meteor.loginWithPassword(user, "stu1", function (err) {		
			if(!err) {
				checkUserType("stu1");
			}
			else {
				alert("Wrong ID or PW!");
				$("input[name='memberId']").val("").focus();
				$("input[name='memberPw']").val("");
			}
		});	
	}
	
	checkUserType = function (id) {
		Meteor.call("getUserInfo", id.toLowerCase(), function (err, res) {
			if(err) {
				alert("Error 011");
				return;
			}
			else {
				Session.set("userType", res.userType);
				Session.set("name", res.name);
				Session.set("teacher", res.teacher);
				Session.set("userId", id.toLowerCase());
				Router.go("/"+res.userType);
			}
		});
	}
}