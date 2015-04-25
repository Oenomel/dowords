
if(Meteor.isClient) {
	addWordToListFunction = function () {
		var eng = $("input[name='inputEng']").val();
		var kor = $("input[name='inputKor']").val();
		
		if(eng == null || kor == null || eng.length === 0 || kor.length === 0) {
			return;
		}
		
		var list = JSON.parse(Session.get("newList"));
		var index = list.length;
		list.push({eng : eng, kor : kor});
		Session.set("newList", JSON.stringify(list));
		
		$(".inputWrapper").hide();
		$(".inputWord").val("");
		
		var newWord = $("<tr class='listItem'></tr>");
		var engDiv = "<td style='border-top:0px'>" + eng + "</td>";
		var korDiv = "<td style='border-top:0px'>" + kor + "</td>";
		
		newWord.append(engDiv).append(korDiv);
		newWord.data("index", index);

		$(".table").append(newWord);
	}
	
	modifyWordFunction = function (target) {
		var td = $(target).find("td");
		var eng = $("input[name='inputEng']").val($(td[0]).text());
		var kor = $("input[name='inputKor']").val($(td[1]).text());
		$("#addWordBtn").hide();
		$(".modifyBtn").show().data("index", $(target).data("index"));	
	}
	
	finishModifyWord = function () {
		$(".inputWrapper").fadeOut(function () {
			$(".inputWord").val("");
			$("#addWordBtn").show();
			$(".modifyBtn").hide().data("index", 0);
		});
	}
	
	doModifyFunction = function () {
		var eng = $("input[name='inputEng']").val();
		var kor = $("input[name='inputKor']").val();
		
		if(eng == null || kor == null || eng.length === 0 || kor.length === 0) {
			return;
		}
		
		var list = JSON.parse(Session.get("newList"));
		var index = $(".modifyBtn").data("index");
		list[index] = {eng : eng, kor : kor};
		Session.set("newList", JSON.stringify(list));
		
		var listItem = $(".table").find(".listItem");
		var engDiv = "<td style='border-top:0px'>" + eng + "</td>";
		var korDiv = "<td style='border-top:0px'>" + kor + "</td>";
		$(listItem[index]).empty().append(engDiv).append(korDiv);
		
		finishModifyWord();
	}
	
	removeWordFunction = function () {
		var list = JSON.parse(Session.get("newList"));
		var index = $("#modifyWordBtn").data("index");
		list.splice(index, 1);
		
		Session.set("newList", JSON.stringify(list));
		
		var listItem = $(".table").find(".listItem");	
		$(listItem[index]).remove();
	
		for(var i=index; i<listItem.length; i++) {
			$(listItem[i+1]).data("index", i);
		}
		
		finishModifyWord();
	}
}