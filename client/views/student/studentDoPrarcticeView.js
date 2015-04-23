
if(Meteor.isClient) {
	
	Template.studentDoPrarcticeView.onRendered(function () {
		if(Session.get("userType") !== "student" || Session.get("userId").length === 0) {
			Router.go("/");
		}
	});
	
	Template.studentDoPrarcticeView.helpers({
		contents : function () {
			var cont = [];
			var view = ViewWord.findOne();
			
			if(view.status == null && view.status === "finish") {
				cont.push({word : "잠시만 기다려 주세요", mean : ""});
			}
			else {
				cont.push({word : view.word, mean : view.mean});
			}
			return cont;
		}
	});
}