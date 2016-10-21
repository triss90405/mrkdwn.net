/******************
Declare variables
******************/
var editorWrapper = document.getElementById('editor'),
    previewWrapper = document.getElementById('preview');

/******************
Save data in localstorage
******************/
var loadEditor = function() {
  editorWrapper.innerHTML = localStorage.getItem("markdown");
};


/******************
Update and compile the preview input to preview area
******************/
var editor = function(input, preview) {

  // Compile and update the to the preview
  this.update = function() {
    preview.innerHTML = markdown.toHTML(input.value);
  };

  // Save data to localstorage
  this.save = function() {
    localStorage.setItem('markdown', input.value);
  };

  input.editor = this;
  this.update();
  this.save();
};


/******************
Run the app
******************/
loadEditor();
editor(editorWrapper, previewWrapper);
