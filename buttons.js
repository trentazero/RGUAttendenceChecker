var studentList = [];
var dummy1 = { id: 1410758, name :"Alessio the First", presence: false};
var dummy2 = { id: 1410759, name :"Alessio the Second", presence: false};
var dummy3 = { id: 1410760, name :"Alessio the Third", presence: false};
studentList.push(dummy1);
studentList.push(dummy2);
studentList.push(dummy3);

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
    console.log("the for loop is working");
		items_html += "<li>" + item.name + "</li>";
	};
	items_html += "</ul>";

	$("#content").append(items_html);

}
