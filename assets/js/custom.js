(function(){
    hljs.initHighlightingOnLoad();

    $(".menu-item__search").bind("click", function(e) {
        $(".menu-search").show(1000);
        $(".menu-search input[type=text]").focus();
    });
    $(".header").bind("click", function(e) {
        if ($(event.target).hasClass("menu")) {
            $(".menu-search").hide();
        }
    });
})();
