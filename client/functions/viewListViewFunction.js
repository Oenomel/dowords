
if(Meteor.isClient) {
	setListViewFunction = function (res) {
		for(var i=0; i<res.length; i++) {
			var cont = $("<div></div>");
			cont.addClass("listItem");
			cont.attr("id", res[i]._id);
			
			var date = res[i].date;
			var memo = res[i].memo;
			
			if(memo.length === 0) {
				memo = "---"
			}
			
			var dateDiv = "<div>" + date + "</div>";
			var memoDiv = "<div>" + memo + "</div>";			
			cont.append(dateDiv).append(memoDiv);
			
			$(".listContainer").append(cont);
		}
	}
}