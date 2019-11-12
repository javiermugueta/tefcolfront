function iFrameResizeEventHandler(event){
	 var response = event.data.params;
	 if(response  == undefined || response.name == undefined || response.height == undefined )
		 throw Error("El frame cliente debe pasar name/height");
    
    if(response.name != ""){
		 $("iframe[name="+response.name+"]").css("height",response.height);
	}
}
function sendHeightToParent(element){
	var alturaElement = element.clientHeight;
	var params = {name:self.name,height:alturaElement};

	parent.postMessage({
		eventName: "frame-resize-handler",
		params: params
	}, "*");
}
MessageEventsHandler.push('frame-resize-handler',iFrameResizeEventHandler);

