/*
  Todo
  - Lorem text
*/


var editorWrapper = document.getElementById('editor');
var previewWrapper = document.getElementById('preview');
var init = function() {
  loadData();
  editor(editorWrapper, previewWrapper);
  colorScheme();
  indentOnTab();
  toggleHtml();
  toggleHelp();
  downloadHtml();
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
    previewWrapper.classList.remove('html');
    document.getElementById('show-html').classList.remove('active');
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


/* Toggle show HTML */
var toggleHtml = function() {
  // Convert html tags to entities
  var htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  var toggleButton = document.getElementById('show-html');
  var htmlContent = previewWrapper.innerHTML;
  document.addEventListener('keyup', function() {
    htmlContent = previewWrapper.innerHTML;
  });
  toggleButton.addEventListener('click', function() {
    this.classList.toggle('active');
    if (previewWrapper.classList.contains('html')) {
      previewWrapper.classList.remove('html');
      previewWrapper.innerHTML = htmlContent;
    }
    else {
      var convertedHtml = htmlEntities(htmlContent);
      previewWrapper.classList.add('html');
      previewWrapper.innerHTML = '<code><pre style="background:transparent;white-space:pre-wrap;">' + convertedHtml + '</pre></code>';
    }
  });
};


/* Tab indent in editor */
var indentOnTab = function() {
  var editor = document.getElementById('editor');
  tabIndent.render(editor);
};


/* Show help Modal */
var toggleHelp = function() {
  var helpButton = document.getElementById('helpButton');
  var helpContainer = document.getElementById('helpContainer');
  var helpClose = document.getElementById('helpClose');
  helpButton.addEventListener('click', function() {
    helpContainer.classList.toggle('active');
  });
  helpClose.addEventListener('click', function() {
    helpContainer.classList.remove('active');
  });
  document.addEventListener("keydown", function(event) {
    var pressedKey = event.which;
    if(pressedKey === 27) {
      helpContainer.classList.remove('active');
    }
  });
};


/* Download HTML */
var downloadHtml = function() {
  var downloadButton = document.getElementById('download');
  downloadButton.addEventListener('click', function() {
    var htmlContent = document.getElementById('preview').innerHTML;
    this.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlContent));
    this.setAttribute('download', 'mrkdwn.html');
    console.log(htmlContent);
  });
};


/* Run when DOM is loaded */
document.addEventListener('DOMContentLoaded', function () {

  /* Initialize App */
  init();

  /* Manual save */
  var manualSave = function() {
    localStorage.setItem('markdown', editorWrapper.value);
    setTimeout(function(){
      window.location.reload();
    },100);
  };

});
