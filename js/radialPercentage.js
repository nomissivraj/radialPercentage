var radialPercentage = {};
var opts = {


};
// options needed:
// - thiccness
// - base color
// - color 

(function (self) {
    self.init = function (container) {
        var target = self.target(container);
        if (self.dependencies() == null) return;

        console.log('target(s) locked');
        target.forEach(function (_this) {
            if (_this.offsetWidth <= 1) return; // Element must be hidden - Do Nothing

            var elWidth = _this.offsetWidth,
                percentage = _this.getAttribute('data-radial-percentage');

            var props = {
                id: _this.getAttribute('id'),
                svgWidth: elWidth,
                svgHeight: elWidth,
                startPos: {
                    x: elWidth / 2,
                    y: elWidth / 2
                },
                val: percentage
            };
            console.log(props)
            self.draw(props);
            // For each target:
            // get id
            // get percentage value
        });
    };

    self.draw = function (props) {
        // Ensure only one svg per element (stops duplication on redraw)
        if (!document.querySelector('#' + props.id + ' svg')) 
            d3.select('#'+props.id).append('svg');

            
        drawBase();

        function drawBase() {

        }
    }

    self.target = function (container) {
        var result = document.querySelectorAll(container).length > 0 ? document.querySelectorAll(container) : document.querySelectorAll('[data-radial-percentage]');
        if (!result.length > 0) return;

        return result;
    }
    self.dependencies = function (container) {
        //if (d3 == undefined) return null;
        return true;
    }

})(radialPercentage);

window.addEventListener("load", function () {
    setTimeout(function () {
        radialPercentage.init();
    }, 200);

});

window.addEventListener("resize", function () {
    radialPercentage.init();
});