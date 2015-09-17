var accessToken = '2109413719.1fb234f.f9b57b9514ec48b8bc087f914f6c55c5 ';
var limit = 45;
var setSize = "small";

var instagram = function() {
	return {
		init: function() {
			instagram.loadImages();
		},
		loadImages: function() {
			var getImagesURL = 'https://api.instagram.com/v1/tags/penedoriders/media/recent?client_id=be52cb013dda4c47a03cdd5689896c37&access_token='+ accessToken +'';
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: getImagesURL,
				success: function(data) {
					for(var i=0; i<limit; i+=1) {
						if(setSize == "small") {
							var size = data.data[i].images.thumbnail.url;
						} else if(setSize == "medium") {
							var size = data.data[i].images.low_resolution.url;
						} else {
							var size = data.data[i].images.standard_resolution.url;	
						}
						$("#instagram").append("<li class='col s6'><a target='_blank' href='" + data.data[i].link +"'><img src='" + size +"'></img></a></li>");
					}
				}
			});
		}
	}
}();

$(document).ready(function() {
    instagram.init();
});