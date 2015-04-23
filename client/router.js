
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
	
	if(userId.length !== 0 || userType !== "teacher") {
		this.render("teacherHomeView");
	}
	else {
		this.render("initView");
	}
});

Router.route("/student", function () {
	var userId = Session.get("userId");
	var userType = Session.get("userType");
	
	if(userId.length !== 0 || userType !== "student") {
		this.render("studentHomeView");
	}
	else {
		this.render("initView");
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
		else {
			this.render("student_doPracticeView");
		}
		return;
	}
	this.render("viewListView");
});

Router.route("/teacher/doPractice", function () {
	var userId = Session.get("userId");
	var userType = Session.get("userType");
	
	if(userId.length !== 0 || userType !== "student") {
		this.render("teacher_doPracticeView");
	}
	else {
		this.render("initView");
	}
});