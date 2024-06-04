$(document).ready(function() {
    $("#nav").on('click','li',function(){
		// remove classname 'active' from all li who already has classname 'active'
		$("#nav li.current").removeClass("current"); 
		// adding classname 'active' to current click li 
		$(this).addClass("current"); 
	});
});