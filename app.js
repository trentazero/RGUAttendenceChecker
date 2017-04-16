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
            var output = "Students attendence: ";
            var percentage = Math.round((studCounter / studentList.length) * 10000) / 100;
            output += studCounter + "/" + studentList.length + " - " + percentage + "%";
            return output;
        },
        addStudentV: function() {
            var newSt = {
                id: $("#ID").val(),
                name: $("#studName").val(),
                presence: "[ ]"
            }
            studentList.push(newSt);
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
            console.log("i work");
            pdf.setFont('helvetica')
            pdf.setFontType('bold')
            for(i=0; i < this.studentList.length; i++){
              pdf.text(20, 50, 'Hello world!');
            }
            pdf.save('attendence_sheet.pdf');
        }
    }
});
