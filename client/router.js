
Router.route('/', function () {
	var userType = Session.get("userType");
	
	if(userType === "noType") {
		this.render("initView");
	}
	else if(userType === "teacher") {
		this.redirect("/teacher");
	}
	else if(userType === "student") {
		this.redirect("/student");
	}
});

Router.route("/teacher", function () {
	var userId = Session.get("userId");
	var userType = Session.get("userType");
	
	if(userId.length !== 0 && userType === "teacher") {
		this.render("teacherHomeView");
	}
	else {
		Session.set("userType", "noType");
		this.redirect("/");
	}
});

Router.route("/teacher/newList", function () {
	this.render("createNewListView");
});

Router.route("/viewList", function () {
	if(this.params.query.list != null && this.params.query.list.length > 0) {
		if(Session.equals("userType", "teacher")) {
			this.render("wordListView");
		}
		else if(Session.equals("userType", "student")) {
			this.render("studentSelfPracticeView");
		}
		else {
			Session.set("userType", "noType");
			this.redirect("/");
		}
		return;
	}
	this.render("viewListView");
});

Router.route("/teacher/doPractice", function () {
	var userId = Session.get("userId");
	var userType = Session.get("userType");
	
	if(userId.length !== 0 && userType === "teacher") {
		this.render("teacherDoPracticeView");
	}
	else {
		Session.set("userType", "noType");
		this.redirect("/");
	}
});


Router.route("/student", function () {
	var userId = Session.get("userId");
	var userType = Session.get("userType");
	
	if(userId.length !== 0 && userType === "student") {
		this.render("studentHomeView");
	}
	else {
		Session.set("userType", "noType");
		this.redirect("/");
	}
});

Router.route("/student/doPractice", function () {
	var userId = Session.get("userId");
	var userType = Session.get("userType");
	
	if(userId.length !== 0 && userType === "student") {
		this.render("studentDoPracticeView");
	}
	else {
		Session.set("userType", "noType");
		this.redirect("/");
	}
})