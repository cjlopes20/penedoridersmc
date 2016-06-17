var accessToken = '2109413719.ddddefa.64f721aa89ec46aa8acc7f0c2bc09380';
// 1113492973.ddddefa.f0e10f69a49c444398f33527caa472a0
var clientID = 'ddddefa7d2ef41599a6696217d116202';
var limit = 45;
var setSize = "small";

var instagram = function() {
	return {
		init: function() {
			instagram.loadImages();
		},
		loadImages: function() {
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
                url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken + '',
				// url: 'https://api.instagram.com/v1/user/penedoriders/media/recent?client_id=' + clientID + '&access_token='+ accessToken + '',
				success: function(data) {
					for(var i=0, lenI = data.data.length; i < lenI; i+=1) {
						if(setSize == "small") {
							var size = data.data[i].images.thumbnail.url;
						} else if(setSize == "medium") {
							var size = data.data[i].images.low_resolution.url;
						} else {
							var size = data.data[i].images.standard_resolution.url;	
						}
						$("#instagram").append('<div class="col s6 item-membro"><a target="_blank" href="' + data.data[i].link + '"><img src="' + size +'" class="responsive-img" /></a></div>');
					}
				}
			});
		}
	}
}();

$(document).ready(function() {
    instagram.init();
});