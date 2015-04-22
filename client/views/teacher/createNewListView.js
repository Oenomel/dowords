
if(Meteor.isClient) {
	Session.set("newList", "[]");
	
	Template.createNewListView.onRendered(function () {
		if(Session.equals("userType", "noType")) {
			Router.go("/");
		}
		else if(Session.equals("userId", null)) {
			Router.go("/teacher");
		}
		
		$(".inputWrapper").hide();
	});
	
	Template.createNewListView.events({
		"click .insertWordBtn" : function () {
			$(".inputWrapper").fadeIn();
		},
		
		"click #addWordBtn" : function () {
			addWordToListFunction();
		},
		
		"click #cancelWordBtn" : function () {
			$("input[name='inputText']").val("");
			$(".inputWrapper").fadeOut();
		},
		
		"click #submitListBtn" : function () {
			var memo = $("[name='listMemo']").val();
			var list = Session.get("newList");
			
			if(list != null) {
				var arr = JSON.parse(list);
				if(arr.length === 0 || arr[0].word == null || arr[0].mean == null) {
					alert("단어를 등록해 주세요!");
					return;
				}
				Meteor.call("insertNewList", memo, Session.get("newList"), function (err) {
					if(err) {
						alert("Error 002");
					}
					else {
						Router.go("/teacher");
					}
					return;
				});
			}
			else {
				alert("단어를 등록해 주세요!");
				return;
			}
		},
		
		"click #cancelListBtn" : function () {
			Session.set("newList", "");
			Router.go("/teacher");
		}
	});
}