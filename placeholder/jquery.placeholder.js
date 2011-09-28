jQuery(function(){
	var placeHolder = {

		/* 
			params: opts {
				id_div - element id (can be class)
				color_onfocus - text color inside input on it is focused.
				color_background_onfocus - background color of input.
			}
					   
		*/
		init: function(opts){
	
			var input = jQuery(opts.div).find(":input");
			var default_color = "";
			var default_background_color = "";
		
			jQuery(input).focusin(function() {
				default_color = jQuery(opts.div).find("span").css("color");
				default_background_color = jQuery(this).css("background-color");

				jQuery(this).css("background-color", opts.color_background_onfocus);
				jQuery(this).siblings("span").css("color",opts.color_onfocus);
			});

			jQuery(input).focusout(function() {
				jQuery(this).css("background-color", default_background_color);
				jQuery(this).siblings("span").css("color",default_color);
	
				placeHolder.trata_label_se_campo_vazio(jQuery(this));
			});

			jQuery(input).change(function() {
				placeHolder.trata_label_se_campo_vazio(jQuery(this));
			});

			jQuery(input).live('keypress', function(e) {
				if (e.keyCode != 9) {
						jQuery(this).siblings("span").hide();
				}
			});
		},

		trata_label_se_campo_vazio: function(elemento){
			if(jQuery(elemento).attr("value").trim() == "") {
				jQuery(elemento).siblings("span").show();
				jQuery(elemento).attr("value", "");
			} else {
				jQuery(elemento).siblings("span").hide();
			}
		}
	}
	
	jQuery.fn.extend({
	
		placeholder:function(options){
		
			default_options = {
				color_onfocus: "b9b9b9", 
				color_background_onfocus: "white"
			}
		
			if (options){
				options = jQuery.fn.extend(default_options, options);
			}else{
				options = default_options;
			}
		
			var div = this;
			options.div = div;
			placeHolder.init(options);
				
			return this;
		}
		
	});

});


