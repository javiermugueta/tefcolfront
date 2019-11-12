function attachHandleMessageEvent(eventName, eventCallback){
	if(eventName && eventCallback)
		this.MessageEvents[eventName] = eventCallback;
}
var MessageEventsHandler = {
		MessageEvents : {},
		push:attachHandleMessageEvent
}
window.addEventListener('message', function(event) {
// Verificar origen
//	if (~event.origin.indexOf('http://yoursite.com')) { 
//        console.log(event.data);
//	} else {
//	     return; 
//	}
    if(event.data && event.data.eventName && MessageEventsHandler.MessageEvents[event.data.eventName])
    	MessageEventsHandler.MessageEvents[event.data.eventName](event)
 });