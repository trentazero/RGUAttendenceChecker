var studentList = [];
var dummy1 = {
    id: "1410758",
    name: "Alessio Gadaleta",
    presence: "[ ]"
};
var dummy2 = {
    id: "1511459",
    name: "Serena Battistoni",
    presence: "[ ]"
};
var dummy3 = {
    id: "1811454",
    name: "Lucy Pennington",
    presence: "[ ]"
};
var dummy4 = {
    id: "1812478",
    name: "Koni Watson",
    presence: "[ ]"
};
studentList.push(dummy1);
studentList.push(dummy2);
studentList.push(dummy3);
studentList.push(dummy4);

var studCounter = 0;


var app = new Vue({
    el: '#app',
    data: {
        scanner: null,
        activeCameraId: null,
        cameras: [],
        scans: [],
        // luke addon
        studentList: studentList
    },
    mounted: function() {
        var self = this;

        self.scanner = new Instascan.Scanner({
            video: document.getElementById('preview'),
            scanPeriod: 5
        });
        // a continuous listener?
        self.scanner.addListener('scan', function(content, image) {
            self.scans.unshift({
                date: +(Date.now()),
                content: content
            });
            // luke addon for each
            $.each(self.studentList, function(i, student) {
                if (student.id == content) {
                    student.presence = "[V]";
                    studCounter++;
                    console.log(studCounter);
                }
            });
        });
        Instascan.Camera.getCameras().then(function(cameras) {
            self.cameras = cameras;
            if (cameras.length > 0) {
                self.activeCameraId = cameras[0].id;
                self.scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function(e) {
            console.error(e);
        });
    },
    methods: {
        formatName: function(name) {
            return name || '(unknown)';
        },
        selectCamera: function(camera) {
            this.activeCameraId = camera.id;
            this.scanner.start(camera);
        },
        statistics: function() {
            var output = "Students attendance: ";
            var percentage = Math.round((studCounter / studentList.length) * 10000) / 100;
            output += studCounter + "/" + studentList.length + " - " + percentage + "%";
            return output;
        },
        addStudentV: function() {

            /*
            if ((elText.value.length != 7) && (elText.value.length != 0)) {
                    alert("Wrong Student ID")
                    console.log("hey");
                    elText.focus();
                    elText.value = "";
                }
            */
            var newId = $("#ID").val();
            var newName = $("#studName").val();
            if (newId === "") {
                alert("Name field cannot be empty!");
            } else if (newId === "") {
                alert("Id field cannot be empty!");
            } else if (newId.length != 7 && isNaN(newId)) {
                alert("Id field must contain 7 numeric characters!");
            } else {
                var newSt = {
                    id: newId,
                    name: newName,
                    presence: "[ ]"
                }
                studentList.push(newSt);
            }
        },
        clearAll: function() {
            studCounter = 0;
            scans = [];
            studentList = [];
            while (this.scans.length > 0) {
                this.scans.pop();
            }
            while (this.studentList.length > 0) {
                this.studentList.pop();
            }
            console.log("clearAll start");
        },
        printPDF: function() {
            var pdf = new jsPDF();
            pdf.setFont('helvetica')
            pdf.setFontType('bold')
            var d = new Date();
            var today = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + "\n";
            var printText = "Attendance Sheet for " + today + " \n";
            for (i = 0; i < this.studentList.length; i++) {
                var student = this.studentList[i];
                printText += "id: " + student.id + " name: " + student.name + " present today " + student.presence + "\n";
            }
            var percentage = Math.round((studCounter / studentList.length) * 10000) / 100;
            printText += "\nAttendance: " + studCounter + "/" + studentList.length + " - " + percentage + "%";
            pdf.text(20, 50, printText);
            pdf.save('attendence_sheet.pdf');
        }
    }
});
