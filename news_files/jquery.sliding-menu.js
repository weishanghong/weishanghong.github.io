
(function(jQuery){
  jQuery.fn.slidingMenu = function(options) {
    options = jQuery.extend({
      backgroundClass: "Background", initialOpacity: 1, slideSpeed: 1, easing: 'linear', callback: function(){}, backgroundContent: '<div></div>', activeClass: "activ-menu", highlightOnClick: false
    }, options);
    options.slideTime = 200 * (1/options.slideSpeed);
	options.activeId = 'activ';
    options.initial_height = jQuery(this).find("li:eq(0)").find("a:eq(0)").outerHeight();
    options.initial_width = jQuery(this).find("li:eq(0)").find("a:eq(0)").outerWidth();
    jQuery(this).css({
      'position': 'relative',
    });
    jQuery(this).find("li a").css({
      'display': 'inline-block',
      'position': 'relative'
    });
    jQuery(this).prepend('<li class="'+options.backgroundClass+'" style="top:0px; left:0px; position: absolute; z-index: 0; display: none; width:'+options.initial_width+'px; height:'+options.initial_height+'px; ">'+options.backgroundContent+'</li>');
    options.initial_top = jQuery(this).find("."+options.backgroundClass).eq(0).position().top;
    options.initial_left = jQuery(this).find("."+options.backgroundClass).eq(0).position().left;
    if(options.highlightOnClick) {
      jQuery(this).find("."+options.backgroundClass).eq(0).css({
        'display': 'block'
      });
    }
    jQuery(this).find("li a").hover(function(){
	  // 添加悬浮样式
	  var ll = jQuery(this).parents().find("li.activ-menu").attr("id",options.activeId);
	  jQuery(this).parents("ul:first").find("li").removeClass(options.activeClass);
	  
	  var t = jQuery(this).position().top;
      var l = jQuery(this).position().left;
      var w = jQuery(this).outerWidth();
      var h = jQuery(this).outerHeight();
	  
      jQuery(this).parents("ul:first").find("."+options.backgroundClass).stop().animate({
        opacity: options.initialOpacity, top: t, left: l, width: w, height: h
      }, options.slideTime, options.easing, options.callback );
    }, function(){
	  // 添加悬浮样式
	  //jQuery(this).parents("ul:first").find("li#"+options.activeId).addClass(options.activeClass);
      if(options.highlightOnClick){
        jQuery(this).parents("ul:first").find("."+options.backgroundClass).stop().animate({
          opacity: "1",
          top: options.initial_top,
          left: options.initial_left
        }, 500);
      }else {
		var $li = jQuery(this).parents().find("li#"+options.activeId);
		if($li == null){
			jQuery(this).parents("ul:first").find("."+options.backgroundClass).stop().animate({
			  opacity: "0"
			}, 500);
		}else{
			var t = $li.position().top;
			var l = $li.position().left;
			var w = $li.outerWidth();
			var h = $li.outerHeight();
			jQuery(this).parents("ul:first").find("."+options.backgroundClass).stop().animate({
			  opacity: options.initialOpacity, top: t, left: l, width: w, height: h
			}, options.slideTime, options.easing,function(){
				jQuery(this).animate({
				  opacity: "0"
				},0);
				$li.addClass(options.activeClass)
			});
		}
       
      }
    });
    jQuery(this).find("li a").click(function(){
      jQuery(this).parents("ul:first").find("."+options.backgroundClass).stop().animate({
        opacity: "1"
      }, 100).animate({
        opacity: options.initialOpacity
      }, 300);
      jQuery(this).parents("ul:first").find("li a").removeClass(options.activeClass);
      jQuery(this).addClass(options.activeClass);
      if(options.highlightOnClick) {
        options.initial_top = jQuery(this).position().top;
        options.initial_left = jQuery(this).position().left;
      }
    });
  }
})(jQuery);
