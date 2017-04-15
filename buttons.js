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
		$("#submitStudent").click.click(function(){
			addStudent();
		});
});

function addStudent() {
	var newStud = {id:$("#ID").value, name:$("#studName").value, presence: false};
	console.log(newId);
	$("#dialog").dialog("close");

}
