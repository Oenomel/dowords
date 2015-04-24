
if(Meteor.isServer) {
	Meteor.methods({
		checkUserAuth : function (userType) {
			var user = Users.findOne({username : username});
			var type = user.profile.userType;
			
			if(type === userType) {
				return true;
			}
			else {
				return false;
			}
		},
		
		getUserInfo : function (username) {
			var user = Users.findOne({username : username});
			
			return {userType : user.profile.userType, name : user.profile.name, teacher : user.profile.teacher};
		},
		
		insertNewList : function (memo, listData) {
			var time = new Date();
			Lists.insert({timeStamp : time.getTime(), memo : memo, words : listData});
		},
		
		getLastList : function () {
			var cursor = Lists.find({}, {sort : {timeStamp : -1}});
			var dateStr = "none";
			var id = "none"
			
			if(cursor.count() !== 0) {
				var lastList = cursor.fetch()[0];
				var date = transferDate(lastList.timeStamp);
				id = lastList._id;
				dateStr = date.year + "." + date.month + "." + date.date + " " + date.day;
			}
			return {_id : id, date : dateStr}
		},
		
		getLists : function () {
			var lists = [];			
			var cursor = Lists.find().fetch();
			
			for(var i=0; i<cursor.length; i++) {
				var list = cursor[i];
				lists.push({_id : list._id, date : dateToString(list.timeStamp), memo : list.memo});
			}
			
			return lists;
		},
		
		getWordList : function (_id) {
			return Lists.find({_id : _id}).fetch();
		},
		
		initDoPractice : function (username, _id) {
			var list = Lists.find({_id : _id}).fetch();		
			var words = JSON.parse(list[0].words);
			var createTeacher = Users.findOne({username : username})._id;
			var viewWord = ViewWord.find({createTeacher : createTeacher});
			
			if(viewWord.count() === 0) {
				ViewWord.insert({eng : words[0].eng, kor : words[0].kor, status : "doing", createTeacher : createTeacher});
			}
			else {
				var getId = viewWord.fetch()[0];			
				ViewWord.update({_id : getId._id}, {eng : words[0].eng, kor : words[0].kor, status : "doing", createTeacher : createTeacher});
			}
						
			return {createTeacher : createTeacher, len : words.length, eng : words[0].eng, kor : words[0].kor};
		},
		
		viewAnotherWord : function (createTeacher, seletectedId, index) {
			var list = Lists.find({_id : seletectedId}).fetch();
			var words = JSON.parse(list[0].words);
			var id = ViewWord.findOne({createTeacher : createTeacher})._id;
		
			ViewWord.update({_id : id}, {$set : {eng : words[index].eng, kor : words[index].kor}});
		
			return {eng : words[index].eng, kor : words[index].kor};
		},
		
		readyToPractice : function (createTeacher) {
			var viewWord = ViewWord.find({createTeacher : createTeacher});
	
			if(viewWord.count() !== 0 && viewWord.fetch()[0]["status"] === "doing") {
				return true;
			}
			else {
				return false;
			}			
		}
	});
}