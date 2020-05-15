var radialPercentage = {};
(function (self) {
    self.init = function () {


        console.log('hello');
    };
})(radialPercentage);

window.addEventListener("load", function () {
   setTimeout(function () {
       radialPercentage.init();
   }, 200);

});

window.addEventListener("resize", function () {
   radialPercentage.init();
});