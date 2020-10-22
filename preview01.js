document.querySelector("#myPdf01").addEventListener("change", function(e){
	const file = e.target.files[0];
  const filereader = new FileReader();
  filereader.addEventListener("load",function(event){
  	document.querySelector('#preview01').setAttribute("src", event.target.result);
  });
  filereader.readAsDataURL(file);//実際にファイル内容を読み込むための記述
});


// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';$("#myPdf01").on("change", function(e){
  var file = e.target.files[0]
  if(file.type == "application/pdf"){
    var fileReader = new FileReader();  
    fileReader.onload = function() {
      var pdfData = new Uint8Array(this.result);
      // Using DocumentInitParameters object to load binary data.
      var loadingTask = pdfjsLib.getDocument({data: pdfData});
      loadingTask.promise.then(function(pdf) {
        console.log('PDF loaded');        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');        var scale = 1.5;
        var viewport = page.getViewport({scale: scale});        // Prepare canvas using PDF page dimensions
        var canvas = $("#pdfViewer01")[0];
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
        });
      }, function (reason) {
        // PDF loading error
        console.error(reason);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
});