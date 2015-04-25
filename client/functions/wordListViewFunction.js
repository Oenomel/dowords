
if(Meteor.isClient) {
	showInputWrapper = function (evt) {
		var cont = evt.currentTarget;
		$(".inputWrapper").fadeIn(function () {
			$("input[name='inputEng']").val($(cont.children[0]).text());
			$("input[name='inputKor']").val($(cont.children[1]).text());
			
			$("#addWordBtn").hide();
			$(".modifyBtn").show().data("index", cont.sectionRowIndex);
		});
	}
	
	addWordContainer = function () {
		var eng = $("input[name='inputEng']").val();
		var kor = $("input[name='inputKor']").val();
		
		if(eng == null || kor == null || eng.length === 0 || kor.length === 0) {
			return;
		}
		
		var list = JSON.parse(Session.get("words"));
		var index = list.length;
		list.push({eng : eng, kor : kor});
		Session.set("words", JSON.stringify(list));
		
		$(".inputWrapper").hide();
		$(".inputWord").val("");
	}
	
	finishModifyWordContainer = function () {
		$(".inputWrapper").fadeOut(function () {
			$(".inputWord").val("");
			$("#addWordBtn").show();
			$(".modifyBtn").hide().data("index", 0);
		});
	}
	
	modifyWordContainer = function () {
		var eng = $("input[name='inputEng']").val();
		var kor = $("input[name='inputKor']").val();
		
		if(eng == null || kor == null || eng.length === 0 || kor.length === 0) {
			return;
		}
		
		var list = JSON.parse(Session.get("words"));
		var index = $(".modifyBtn").data("index");
		list[index] = {eng : eng, kor : kor};
		Session.set("words", JSON.stringify(list));
		
		finishModifyWordContainer();
	}
	
	removeWordContainer = function () {
		var list = JSON.parse(Session.get("words"));
		var index = $("#modifyWordBtn").data("index");
		list.splice(index, 1);
		
		Session.set("words", JSON.stringify(list));
		
		finishModifyWordContainer();
	}
	
	saveChangedWordList = function () {
		if(confirm("목록이 변경 되었습니다. 저장하시겠습니까?")) {
			Meteor.call("changeWordList", Session.get("selectedList"), Session.get("words"), function (err, res) {
				if(err) {
					alert("수정 중 오류가 발생했습니다.");
				}
				else {
					alert("성공적으로 변경되었습니다.");
				}
			});
		}
	}
}