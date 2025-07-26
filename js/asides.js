// Asides positioning scripts from https://gameprogrammingpatterns.com, a 
// fantastic resource for game developers (and software developers) everywhere.
// Check it out, buy the book, and look at how nice his <aside> tags are.

$(document).ready(function() {
    $(window).resize(refreshAsides);
    $(window).resize(moveAsidesToBottom);
  
    // Since we may not have the height correct for the images, adjust the asides
    // too when an image is loaded.
    $('img').on('load', function() {
      refreshAsides();
    });
  
    // On the off chance the browser supports the new font loader API, use it.
    if (document.fontloader) {
      document.fontloader.notifyWhenFontsReady(function() {
        refreshAsides();
      });
    }
  
    // Lame. Just do another refresh after a second when the font is *probably*
    // loaded to hack around the fact that the metrics changed a bit.
    window.setTimeout(refreshAsides, 200);
  
    refreshAsides();
    moveAsidesToBottom();
  });
  
  function refreshAsides() {
    // Don't position them if they're inline.
    if ($(document).width() < 800) return;
  
    // Vertically position the asides next to the span they annotate.
    $("aside").each(function() {
      var aside = $(this);
  
      // Find the span the aside should be anchored next to.
      var name = aside.attr("name");
      var span = $("span[name='" + name + "']");
      if (span == null) {
        window.console.log("Could not find span for '" + name + "'");
        return;
      }
  
      aside.offset({top: span.position().top + 8});
    });
  }
  
  function moveAsidesToBottom() {
    // Only on small screens
    if ($(document).width() >= 800) return;
    var $footer = $("footer");
    if ($footer.length === 0) return;
    // Create or select a container for asides before the footer
    var $asideContainer = $("#mobile-asides");
    if ($asideContainer.length === 0) {
      $asideContainer = $('<div id="mobile-asides" style="padding: 1em 0 1em 0;"></div>');
      $footer.before($asideContainer);
    } else {
      $asideContainer.empty();
    }
    // Move all asides into the container
    $("aside").each(function() {
      $asideContainer.append($(this));
    });
  }