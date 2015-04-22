
if(Meteor.isClient) {
	addWordToListFunction = function () {
		var eng = $("input[name='inputEng']").val();
		var kor = $("input[name='inputKor']").val();
		
		if(eng == null || kor == null || eng.length === 0 || kor.length === 0) {
			return;
		}
		
		var list = JSON.parse(Session.get("newList"));
		list.push({eng : eng, kor : kor});
		Session.set("newList", JSON.stringify(list))
		
		$(".inputWrapper").hide();
		$(".inputWord").val("");
		
		var newWord = $("<div></div>");
		var engDiv = "<div class='leftDiv'>" + eng + "</div>";
		var korDiv = "<div>" + kor + "</div>";
		
		newWord.addClass("word").append(engDiv).append(korDiv);
		$(".wordListContainer").append(newWord);
	}
}