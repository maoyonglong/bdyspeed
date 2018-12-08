document.addEventListener('DOMContentLoaded', function()
{
    var video = {
		changeRate: function(rate){
			if(this.video === ''){
				this.getVideo();
			}	
			injectChangeRateJs(rate);
		}
	};
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
	{
		var cmd = request.cmd;
		var val = request.val;
		if(request.cmd === 'changeRate'){
			video.changeRate(val);
		}
	});
	
	function injectChangeRateJs(rate){
		var code = `(function(){
			videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate(${rate});
		})()`;
		loadInnerScript(code);
	}
	
	function loadInnerScript(code){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.appendChild(document.createTextNode(code));
		script.onload = function(){
			this.parentNode.removeChild(this);
		};
		document.body.appendChild(script);
		setTimeout(function(){
			script.parentNode.removeChild(script)
		}, 50);
	}
});

