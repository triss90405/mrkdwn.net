var editorWrapper=document.getElementById("editor"),previewWrapper=document.getElementById("preview"),init=function(){loadData(),editor(editorWrapper,previewWrapper)},loadData=function(){editorWrapper.innerHTML=localStorage.getItem("markdown")},editor=function(e,t){this.update=function(){t.innerHTML=markdown.toHTML(e.value)},this.save=function(){localStorage.setItem("markdown",e.value)},e.editor=this,this.update(),this.save()};init();