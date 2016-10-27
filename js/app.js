// @codekit-prepend "markdown.js"
// @codekit-prepend "emmet.js"

var editorWrapper = document.getElementById('editor');
var previewWrapper = document.getElementById('preview');
var init = function() {
  loadData();
  editor(editorWrapper, previewWrapper);
  colorScheme();
  emmetInit();
  toggleHtml();
  toggleHelp();
  downloadHtml();
  tabToSave();
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


/* Save and update when tab */
var tabToSave = function() {
  document.addEventListener("keydown", function(event) {
    if (event.which === 9) {
      var input = document.getElementById('editor');
      var preview = document.getElementById('preview');
      localStorage.setItem('markdown', input.value);
      var char = localStorage.getItem('markdown').length;
      preview.innerHTML = markdown.toHTML(input.value);
      preview.classList.remove('html');
      document.getElementById('show-html').classList.remove('active');
      document.getElementById('characterCount').innerHTML = char;
    }
  });
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


/* Initialize emmet plugin */
var emmetInit = function() {
  emmet.require('textarea').setup({
    pretty_break: true,
    use_tab: true
  });
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
