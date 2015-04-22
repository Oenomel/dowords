
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
		
		checkUserType : function (username) {
			var user = Users.findOne({username : username});
			return {userType : user.profile.userType, name : user.profile.name};
		},
		
		insertNewList : function (memo, listData) {
			var time = new Date();
			Lists.insert({timeStamp : time.getTime(), memo : memo, words : listData});
		},
		
		getLastListDate : function () {
			var cursor = Lists.find({}, {sort : {timeStamp : -1}});
			var date = "None";
			
			if(cursor.count() !== 0) {
				var lastList = cursor.fetch()[0];
				date = transferDate(lastList.timeStamp);
			}
			return date.year + "." + date.month + "." + date.date + " " + date.day;
		},
		
		goLastListView : function () {
			var cursor = Lists.find({}, {sort : {timeStamp : -1}});
			
			if(cursor.count() === 0) {
				return false;
			}
			else {
				return cursor.fetch();
			}
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
		
		getListLength : function (_id) {
			var list = Lists.find({_id : _id}).fetch();		
			var words = JSON.parse(list[0].words);
			var viewWord = ViewWord.find();
			
			if(viewWord.count() !== 0) {
				var getId = viewWord.fetch()[0]
				ViewWord.remove({_id : getId._id});
			}
			ViewWord.insert({eng : words[0].eng, kor : words[0].kor, status : "start"});
			
			return {len : words.length, eng : words[0].eng, kor : words[0].kor};
		},
		
		viewAnotherWord : function (seletectedId, index) {
			var list = Lists.find({_id : seletectedId}).fetch();
			var words = JSON.parse(list[0].words);
			var id = ViewWord.findOne()._id;
		
			ViewWord.update({_id : id}, {$set : {eng : words[index].eng, kor : words[index].kor, status : "doing"}});
		
			return {eng : words[index].eng, kor : words[index].kor};
		},
		
		readyToPractice : function () {
			return ViewWord.find().count();
		}
	});
}