
Users = Meteor.users;

/*
	User Profile : {
		userType : #,
		grade : #,
		class : #,
		name : "..."
	}
*/

Lists = new Mongo.Collection("lists");
/*
	Lists = {
		_id : #,
		timeStamp : #,
		createUser : user name (identical value),
		words : [{eng : "...", kor : "..."}, ...],
		memo : "..."
	}
*/

Words = new Mongo.Collection("words")
/*
	Words = {
		_id : #,
		list_id : list id,
		timeStamp : #,
		eng : #,
		kor : #
	}
*/

ViewWord = new Mongo.Collection("viewWord");