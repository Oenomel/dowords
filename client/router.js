
Router.route('/', function () {
	var userType = Session.get("userType");
	
	if(userType === "noType") {
		this.render("initView");
	}
	else if(userType === "teacher") {
		this.redirect("/teacher");
	}
	else if(userType === "student") {
		Session.set("guestName", "");
		this.redirect("/student");
	}
});

Router.route("/teacher", function () {
	var userId = Session.get("userId");
	
	if(userId.length !== 0) {
		this.render("teacherHomeView");
	}
	else {
		this.render("teacherLoginView");
	}
});

Router.route("/student", function () {
	var guestName = Session.get("guestName");
	
	if(guestName == null || guestName.length === 0) {
		this.render("studentInputInfoView");
	}
	else {
		this.render("studentDoPrarcticeView");
	}
});

Router.route("/teacher/newList", function () {
	this.render("createNewListView");
});

Router.route("/teacher/viewList", function () {
	if(this.params.query.list != null && this.params.query.list.length > 0) {
		this.render("wordListView");
		return;
	}
	this.render("viewListView");
});

Router.route("/teacher/doPractice", function () {
	this.render("doPracticeView");
});