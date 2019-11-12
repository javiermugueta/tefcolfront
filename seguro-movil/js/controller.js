/**
 * 
 */

var Contratacion_Controller = {
		init: function () {
			var me = this;
			function manualValidate(ev) {
			    ev.target.checkValidity();
			    return false;
			}
			
			$("section[class*='step-']").not(".step-1").hide();
			$("[class*='question-']").not(".question-1").hide();
			
			$("[action='next-section']").on("click", function() {
				$(this).parents("section").attr("state","no-active");
				$(this).parents("section").next().attr("state","active");
					
				$("section[state='active']").prev().hide();
				$("section[state='active']").show("slide", { direction: "right" }, 500);
				
				var stepName = $("section[state='active']").attr('class').split(' ')[2];
				$(document).trigger('step-changed', [stepName]);
				
				$(function() {
				    var div = $('#dynamicheight');
				    var width = $("section[state='active']").width();
				    div.css('height', width);
				});
			});
			
			$("[action='prev-section']").on("click", function() {
				$(this).parents("section").attr("state","no-active");
				$(this).parents("section").prev().attr("state","active");
					
				$("section[state='active']").next().hide();
				$("section[state='active']").show("slide", { direction: "left" }, 500);
				
				var stepName = $("section[state='active']").attr('class').split(' ')[2];
				$(document).trigger('step-changed', [stepName]);
				
				$(function() {
				    var div = $('#dynamicheight');
				    var width = $("section[state='active']").width();
				    div.css('height', width);
				});
			});
			
			$("[action='next-question']").on("click", function() {
				$(this).parents("[class*='question-']").attr("state","no-active");
				$(this).parents("[class*='question-']").next().attr("state","active");
					
				$("[class*='question-'][state='active']").prev().hide();
				$("[class*='question-'][state='active']").show("slide", { direction: "right" }, 500);
				
				$(function() {
				    var div = $('#dynamicheight');
				    var width = $("[class*='question-'][state='active']").width();
				    div.css('height', width);
				});
			});
			
			$("[action='prev-question']").on("click", function() {
				$(this).parents("[class*='question-']").attr("state","no-active");
				$(this).parents("[class*='question-']").prev().attr("state","active");
					
				$("[class*='question-'][state='active']").next().hide();
				$("[class*='question-'][state='active']").show("slide", { direction: "left" }, 500);
				
				$(function() {
				    var div = $('#dynamicheight');
				    var width = $("[class*='question-'][state='active']").width();
				    div.css('height', '27%');
				});
			});
			
			//EVENT Handlers
			$(document).on('step-changed', function(event, step) {
				$("div[class*='step-'] button").removeClass("active");
				$("div[class*='"+step+"'] button").addClass("active");
				
			});
			
		}
}

