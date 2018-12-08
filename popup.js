function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

window.onload = function(){
	var popup = {
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var rateInput = this.getEl('#rate-input'); 
			var rateBtn = this.getEl('#rate-btn');
			this.setEl('rate-input', rateInput);
			this.setEl('rate-btn', rateBtn);
			this.rateBtnEv();
		},
		getEl: function(selector){
			return document.querySelector(selector);
		},
		setEl: function(key, val){
			this[key] = val;
		},
		rateBtnEv: function(){
			var rateBtn = this['rate-btn'];
			var rateInput = this['rate-input'];
			rateBtn.addEventListener('click', function(){
				var val = rateInput.value;
				sendMessageToContentScript({cmd: 'changeRate', val: val}, function(response){

				});
			}, false);
		}
	};
	popup.init();
}
