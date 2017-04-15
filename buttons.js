var studentList = [];
var dummy1 = { id: 1410758, name :"Alessio Gadaleta", presence: false};
var dummy2 = { id: 1511459, name :"Serena Battistoni", presence: false};
var dummy3 = { id: 1811454, name :"Lucy Pennington", presence: false};
var dummy4 = { id: 1812478, name :"Koni Watson", presence: false};
studentList.push(dummy1);
studentList.push(dummy2);
studentList.push(dummy3);
studentList.push(dummy4);

$(function(){
	  $("#addStudent").click(function(){
			addStudent();
		});
});

function addStudent() {
	// add a list of items to the content div
	//var items = ["hewey", "dewey", "louie"];

	// build the html string for a <ul> list
	var items_html = "<ul>";
	for (var i=0; i < studentList.length; i++) {
		item = studentList[i];
		items_html += "<li>" + item.name + "</li>";
	};
	items_html += "</ul>";

	$("#content").append(items_html);

}
