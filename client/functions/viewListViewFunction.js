
if(Meteor.isClient) {
	setListViewFunction = function (res) {
		for(var i=0; i<res.length; i++) {
			var cont = $("<tr></tr>");
			cont.addClass("listItem");
			cont.attr("id", res[i]._id);
			
			var date = res[i].date;
			var memo = res[i].memo;
			
			if(memo.length === 0) {
				memo = "---"
			}
			
			var dateDiv = "<td>" + date + "</td>";
			var memoDiv = "<td>" + memo + "</td>";			
			cont.append(dateDiv).append(memoDiv);
			
			$(".table").append(cont);
		}
	}
}