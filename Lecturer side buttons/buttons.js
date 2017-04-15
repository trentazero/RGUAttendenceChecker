var studentList = [];
var dummyStudent1 = { id: 1410758, name :"Alessio", presence: false};

$(function(){
	  $("#addStudent").click(function(){
			addStudent();
		});
});

function addStudent() {
	// add a list of items to the content div
	var items = ["hewey", "dewey", "louie"];

	// build the html string for a <ul> list
	var items_html = "<ul>";
	for (var i=0; i < items.length; i++) {
		item = items[i];
		items_html += "<li>" + item + "</li>";
	};
	items_html += "</ul>";

	$("#content").append(items_html);

}
