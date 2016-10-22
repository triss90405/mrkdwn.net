/*
  Todo
  - Resize windows(editor and preview)
  - Manual save button (navigation)
  - Lorem text
  - Manual save
  - View html (http://stackoverflow.com/questions/11092182/display-html-code-in-javascript-string)
*/


var editorWrapper = document.getElementById('editor');
var previewWrapper = document.getElementById('preview');
var characterCount = document.getElementById('characterCount');
var init = function() {
  loadData();
  editor(editorWrapper, previewWrapper);
  colorScheme();
  //save();
  indentOnTab();
  toggleHtml();
};


/* Get data from local storage on load */
var loadData = function() {
  editorWrapper.innerHTML = localStorage.getItem('markdown');
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
  // Display character count
  this.characters = function() {
    var char = localStorage.getItem('markdown').length;
    document.getElementById('characterCount').innerHTML = char;
  };
  input.editor = this;
  this.update();
  this.save();
  this.characters();
};


/* Color Scheme */
var colorScheme = function() {
  var darkColorTrigger = document.getElementById('dark-color-scheme');
  var lightColorTrigger = document.getElementById('light-color-scheme');
  var currentColorScheme = localStorage.getItem('colorScheme');
  var body = document.body;
  body.classList.add(currentColorScheme);
  darkColorTrigger.addEventListener('click', function() {
    body.classList.add('dark');
    localStorage.setItem('colorScheme', 'dark');
  });
  lightColorTrigger.addEventListener('click', function() {
    body.classList.remove('dark');
    localStorage.setItem('colorScheme', 'light');
  });
};


/* Manual save */
// var save = function() {
//   var saveButton = document.getElementById('save');
//   saveButton.addEventListener('click', function() {
//     localStorage.setItem('markdown', editorWrapper.innerHTML);
//     window.location.reload();
//   });
// };


/* Toggle show HTML */
var toggleHtml = function() {

  // Convert html tags to entities
  var htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  var toggleButton = document.getElementById('show-html');
  var htmlContent = previewWrapper.innerHTML;

  toggleButton.addEventListener('click', function() {
    this.classList.toggle('active');

    if (previewWrapper.classList.contains('html')) {
      previewWrapper.classList.remove('html');
      previewWrapper.innerHTML = htmlContent;
    }
    else {
      var convertedHtml = htmlEntities(htmlContent);
      previewWrapper.classList.add('html');
      previewWrapper.innerHTML = '<code contenteditable="true"><pre style="background:transparent;white-space:pre-wrap;">' + convertedHtml + '</pre></code>';
    }
  });
};


/* Tab indent in editor */
var indentOnTab = function() {
  var editor = document.getElementById('editor');
  tabIndent.render(editor);
};


init();
