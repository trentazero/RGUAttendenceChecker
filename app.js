var studentList = [];
var dummy1 = { id: "1410758", name :"Alessio Gadaleta", presence: "[ ]"};
var dummy2 = { id: "1511459", name :"Serena Battistoni", presence: "[ ]"};
var dummy3 = { id: "1811454", name :"Lucy Pennington", presence: "[ ]"};
var dummy4 = { id: "1812478", name :"Koni Watson", presence: "[ ]"};
studentList.push(dummy1);
studentList.push(dummy2);
studentList.push(dummy3);
studentList.push(dummy4);

//var studCounter = { counter : 0 };



var app = new Vue({
  el: '#app',
  data: {
    scanner: null,
    activeCameraId: null,
    cameras: [],
    scans: [],
    // luke addon
    studentList: studentList,
    studCounter : 0
  },
  mounted: function () {
    var self = this;

    self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
    // a continuous listener?
    self.scanner.addListener('scan', function (content, image) {
      self.scans.unshift({ date: +(Date.now()), content: content });
      // luke addon for each
      $.each(self.studentList, function(i, student) {
        if (student.id == content){
          student.presence = "[V]";
          this.studCounter++;
          console.log(this.studCounter);
        }
      });
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      self.cameras = cameras;
      if (cameras.length > 0) {
        self.activeCameraId = cameras[0].id;
        self.scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
  },
  methods: {
    formatName: function (name) {
      return name || '(unknown)';
    },
    selectCamera: function (camera) {
      this.activeCameraId = camera.id;
      this.scanner.start(camera);
    },
    clearAll: function(){
      studentList = [];
      console.log(studentList);
    },
    // try
    statistics: function(){
      var output = "Students attendence: ";
      /*
      $.each(self.studentList, function(i, student){
        if (student.id == content){
          studCounter++;
        }
      }); */
      output += this.studCounter + "/" + studentList.length;
      return output;
    }

  }
});
