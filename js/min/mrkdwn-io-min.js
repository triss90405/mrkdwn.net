var editorWrapper=document.getElementById("editor"),previewWrapper=document.getElementById("preview"),characterCount=document.getElementById("characterCount"),init=function(){loadData(),editor(editorWrapper,previewWrapper),colorScheme(),indentOnTab(),toggleHtml()},loadData=function(){editorWrapper.innerHTML=localStorage.getItem("markdown")},editor=function(e,t){this.update=function(){t.innerHTML=markdown.toHTML(e.value),previewWrapper.classList.remove("html"),document.getElementById("show-html").classList.remove("active")},this.save=function(){localStorage.setItem("markdown",e.value)},this.characters=function(){var e=localStorage.getItem("markdown").length;document.getElementById("characterCount").innerHTML=e},e.editor=this,this.update(),this.save(),this.characters()},colorScheme=function(){var e=document.getElementById("dark-color-scheme"),t=document.getElementById("light-color-scheme"),r=localStorage.getItem("colorScheme"),n=document.body;n.classList.add(r),e.addEventListener("click",function(){n.classList.add("dark"),localStorage.setItem("colorScheme","dark")}),t.addEventListener("click",function(){n.classList.remove("dark"),localStorage.setItem("colorScheme","light")})},toggleHtml=function(){var e=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},t=document.getElementById("show-html"),r=previewWrapper.innerHTML;document.addEventListener("keydown",function(){r=previewWrapper.innerHTML}),t.addEventListener("click",function(){if(this.classList.toggle("active"),previewWrapper.classList.contains("html"))previewWrapper.classList.remove("html"),previewWrapper.innerHTML=r;else{var t=e(r);previewWrapper.classList.add("html"),previewWrapper.innerHTML='<code contenteditable="true"><pre style="background:transparent;white-space:pre-wrap;">'+t+"</pre></code>"}})},indentOnTab=function(){var e=document.getElementById("editor");tabIndent.render(e)};init();var manualSave=function(){localStorage.setItem("markdown",editorWrapper.value),setTimeout(function(){window.location.reload()},100)};