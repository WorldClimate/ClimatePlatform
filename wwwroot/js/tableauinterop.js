// tableau invoker for Blazor
// I've been lazy and added this to the window object
window.initViz = function (containerDiv, url) {
    // containerDiv: element to update - use @ref in Blazor to get this
    console.log("initViz called for " + url);
    if (!containerDiv) throw "no container provided";
    if (!url) throw "no url provided";

    var options = {
        hideTabs: true,
        height: "800px",
        width: "1000px",
        onFirstInteractive: function () {
            console.log("Run this code when the viz has finished loading.");
        }
    };
    console.log("initViz calling .Viz()");
    viz = new tableau.Viz(containerDiv, url, options);
}