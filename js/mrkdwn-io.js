/******************
Declare variables
******************/
var editorWrapper = document.getElementById('editor');
var previewWrapper = document.getElementById('preview');

var init = function() {
  loadData();
  editor(editorWrapper, previewWrapper);
};


/* Get data from local storage on load */
var loadData = function() {
  editorWrapper.innerHTML = localStorage.getItem("markdown");
};

/* Editor */
var editor = function(input, preview) {

  // Compile and update to the preview
  this.update = function() {
    preview.innerHTML = markdown.toHTML(input.value);
  };

  // Save data to localStorage
  this.save = function() {
    localStorage.setItem('markdown', input.value);
  };

  input.editor = this;
  this.update();
  this.save();
};

init();


/*
  Todo
    - Resize windows(editor and preview)
    - Color shceme changer
    - Save color scheme choice to localstorage
    - Manual save button (navigation)
    - Info bar (footer)
*/
