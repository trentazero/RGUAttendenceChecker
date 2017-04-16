/*var studentList = [];
var dummy1 = { id: 1410758, name :"Alessio Gadaleta", presence: false};
var dummy2 = { id: 1511459, name :"Serena Battistoni", presence: false};
var dummy3 = { id: 1811454, name :"Lucy Pennington", presence: false};
var dummy4 = { id: 1812478, name :"Koni Watson", presence: false};
studentList.push(dummy1);
studentList.push(dummy2);
studentList.push(dummy3);
studentList.push(dummy4);

$(function(){
		$("#submitStudent").click(function(){
			addStudent();
		});
});
*/

function addStudent() {
  /*
    var newStud = {
        id: $("#ID").val(),
        name: $("#studName").val(),
        presence: "[ ]"
    };
    console.log(newStud);
    $("#dialog").dialog('close');
    studentList.push(newStud); */
    var newId = $("#ID").val();
    var newName = $("#studName").val();
    if (newName === "") {
        alert("Name field cannot be empty!");
    } else if (newId === "") {
        alert("Id field cannot be empty!");
    } else if (newId.length != 7) {
        alert("Id field must contain 7 numeric characters!");
    } else {
        var newSt = {
            id: newId,
            name: newName,
            presence: "[ ]"
        }
        studentList.push(newSt);
    }
}
