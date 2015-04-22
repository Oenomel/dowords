
if(Meteor.isClient) {
	loginFunction = function () {
		var id = $("input[name='memberId']").val();
		var pw = $("input[name='memberPw']").val();
		
		Meteor.call("loginMethod", id, pw, function (err, res) {
			if(err) {
				alert("Error 001");
				return;
			}
			
			if(res === "-1") {
				alert("Wrong ID!");
				$("input[name='memberId']").val("").focus();
				$("input[name='memberPw']").val("");
			}
			else if(res === "0") {
				alert("Wrong PW!");
				$("input[name='memberPw']").val("").focus();
			}
			else {
				Session.set("userId", res);
				Router.go("/teacher");
			}
			return;
		});
	}
}