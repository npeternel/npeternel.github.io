// $("a[href*='" + location.pathname + "']").addClass("current");
(function(){
      function VerticalTimeline( element ) {
          this.element = element;
          this.blocks = this.element.getElementsByClassName("about-timeline-block");
          this.icons = this.element.getElementsByClassName("about-timeline-icon");
          this.contents = this.element.getElementsByClassName("about-timeline-content");
          this.lines = this.element.getElementsByClassName("about-timeline-line");
          this.offset = 0.9;
          this.hideBlocks();
      };
  
      VerticalTimeline.prototype.hideBlocks = function() {
          if ( !"classList" in document.documentElement ) {
              return;
          }
          var self = this;
          for( var i = 0; i < this.blocks.length; i++) {
              (function(i){
                  if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
                    self.icons[i].classList.add("about-timeline--hidden"); 
                    self.contents[i].classList.add("about-timeline--hidden"); 
                    self.lines[i].classList.add("about-timeline--hidden");
                  }
              })(i);
          }
      };
  
      VerticalTimeline.prototype.showBlocks = function() {
          if ( ! "classList" in document.documentElement ) {
              return;
          }
          var self = this;
          for( var i = 0; i < this.blocks.length; i++) {
              (function(i){
                  if( self.contents[i].classList.contains("about-timeline--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
                      self.icons[i].classList.add("about-timeline-icon--in");
                      self.contents[i].classList.add("about-timeline-content--in");
                      self.lines[i].classList.add("about-timeline-line--in");
                      self.icons[i].classList.remove("about-timeline--hidden");
                      self.contents[i].classList.remove("about-timeline--hidden");
                      self.lines[i].classList.remove("about-timeline--hidden");
                  }        
              })(i);
          }
      };
  
      var verticalTimelines = document.getElementsByClassName("js-about-timeline"),
          verticalTimelinesArray = [],
          scrolling = false;
      if( verticalTimelines.length > 0 ) {
          for( var i = 0; i < verticalTimelines.length; i++) {
              (function(i){
                  verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
              })(i);
          }
  
          //show timeline blocks on scrolling
          window.addEventListener("scroll", function(event) {
              if( !scrolling ) {
                  scrolling = true;
                  (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
              }
          });
      }
  
      function checkTimelineScroll() {
		verticalTimelinesArray.forEach(function(timeline){
			timeline.showBlocks();
		});
		scrolling = false;
	};
})();