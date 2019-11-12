function appendFieldsToForm(form,fields){
	for (var i = 0; i < fields.length; i++) {
		var objkeys = Object.keys(fields[i]);
		var node = document.createElement("input");
		for (var j = 0; j < objkeys.length; j++) {
			node[objkeys[j]] = fields[i][objkeys[j]];
		}
		form.appendChild(node.cloneNode());
	}
}
function pushField(field){
	for(let i = 0; i<PasarelaController.fields.length;i++){
		if(PasarelaController.fields[i].name == field.name){
			delete PasarelaController.fields[i];
		}
	}
	PasarelaController.fields.push(	{
		type:"hidden",
		name:"retry",
		value:"true"
	 });
}

var PasarelaController = {
	init:function(target){
		var frame = $("iframe[name="+target+"]")[0];
		if(frame==undefined)
			throw Error("El target debe existir");
		PasarelaController.frameName = target;
		PasarelaController.generateForm();
		PasarelaController.setResponseEventListener();
	},
	form :   (PasarelaController && PasarelaController.form)?PasarelaController.form:document.createElement("form"),
	pushField: pushField,
	fields : 
		[
	        	
				{
		      		type:"hidden",
		      		name:"isARetry",
	      	 	},
				{
		      		type:"hidden",
		      		name:"urlOk",
		      		value:"/es/productos/ciber-empresa/response.html"
		      	 },
		      	{
		      		type:"hidden",
		      		name:"urlKo",
		      		value:"/es/productos/ciber-empresa/response.html"
		      	 },
		      	{
		      		type:"hidden",
		      		name:"Authorization"
		      	},
		      	{
		      		type:"hidden",
		      		name:"policiesNumbers"
		      	},
		      	{
		      		type:"hidden",
		      		name:"embedded",
		      		value:"true"
		      	}
		 ],
		 
	setResponseEventListener: function(){
		 MessageEventsHandler.push('payment-response',function(event) {
			 if(PasarelaController.responseCallback != undefined){
				 $("iframe[name="+PasarelaController.frameName+"]")[0].contentWindow.postMessage({"eventName":"payment-response-handled"},'*');//window.location.host
				 var response = event.data.params;
				 PasarelaController.responseCallback(response.code, response.msg, response.requestNumber, response.policyNumber);	
			 }
		 });	

	},
	generateForm : function() {
		PasarelaController.form.action = CONSTANTES.REST.PAYMENT+"authorization";//'http://216.177.213.245:6980/servlet/ServletDirector';
		PasarelaController.form.target = PasarelaController.frameName;//'payment-frame';
		PasarelaController.form.method = "POST";
		// PasarelaController.form.id = id;//"payment-form";
		appendFieldsToForm(PasarelaController.form, PasarelaController.fields);
		$("iframe[name="+PasarelaController.frameName+"]").parent().append(PasarelaController.form);
	},
	loadFrame: function(policiesNumbers, token, isARetry) {
		PasarelaController.form.elements["Authorization"].value = token;
		PasarelaController.form.elements["policiesNumbers"].value = policiesNumbers;
		PasarelaController.form.elements["isARetry"].value = isARetry;	
		PasarelaController.form.submit();
	}
};
