var radialPercentage = {};
var opts = {
    //backgroundColor: 'green'

};
// options needed:
// - base color
// - color 

(function (self) {
    var animating = false;
    self.init = function (container, animate, opts) {
        var target = self.target(container);
        if (self.dependencies() === null) return;

        target.forEach(function (_this) {
            if (_this.offsetWidth <= 1) return; // Element must be hidden - Do Nothing

            var elWidth = _this.offsetWidth,
                percentage = _this.getAttribute('data-radial-percentage');

            var props = {
                id: _this.getAttribute('id'),
                svgWidth: elWidth,
                svgHeight: elWidth,
                stroke: 10,
                startPos: {
                    x: elWidth / 2,
                    y: elWidth / 2
                },
                val: percentage,
                style: {
                    backgroundColor: (!opts || !opts.backgroundColor ? "#cccccc" : opts.backgroundColor),
                    primaryColor: (!opts || !opts.primaryColor ? "#425563" : opts.primaryColor)
                },
                animate: (animate ? true : false)
            };
            if (!animating) {
                self.draw(props);
            }

            // For each target:
            // get id
            // get percentage value
        });
    };

    self.draw = function (props) {
        // Ensure only one svg per element (stops duplication on redraw)
        document.querySelector('#' + props.id + ' svg') ? d3.select('#' + props.id + ' svg').remove() : null;
        d3.select('#' + props.id).append('svg').attr('id', props.id + '-svg').attr('width', props.svgWidth).attr('height', props.svgHeight);
        var canvas = d3.select('#' + props.id + '-svg');

        drawBase();
        drawPercentage();

        function drawBase() {
            drawArc(0, 100, props.style.backgroundColor, 'base');
        }

        function drawPercentage() {
            var curVal = -1,
                endVal = props.val;


            if (props.animate) {
                var animate = setInterval(function () {
                    if (curVal === endVal) {
                        animating = false;
                        clearInterval(animate);
                    } else {
                        animating = true;
                    }
                    d3.select('#' + props.id + ' .meter').remove();
                    d3.select('#' + props.id + ' .svg-label').remove();

                    drawArc(0, curVal, props.style.primaryColor, 'meter');
                    drawLabel(curVal, props.style.primaryColor);


                    curVal++;
                }, 10);

            } else {
                drawArc(0, props.val, props.style.primaryColor, 'meter');
                drawLabel(props.val, props.style.primaryColor);
            }
        }

        function drawLabel(val, color) {
            canvas.append('text').attr('class', "svg-label").attr('fill', color).attr('transform', 'translate(' + props.startPos.x + "," + props.startPos.y + ')').text(val);
        }

        function drawArc(sAngle, eAngle, color, className, inset) {
            !inset ? inset = 0 : inset = inset;
            // Arc properties
            var arc = d3.svg.arc()
                .outerRadius(props.svgWidth / 2 - inset)
                .innerRadius(props.svgWidth / 2 - (props.svgWidth / 15 - inset))
                .startAngle(sAngle / 100 * Math.PI * 2)
                .endAngle(eAngle / 100 * Math.PI * 2);

            //Append path and arc to path
            canvas.append('path').attr('class', className).attr('fill', color).attr('d', arc).attr('transform', 'translate(' + props.startPos.x + "," + props.startPos.y + '), rotate(0)');
        }
    };

    self.target = function (container) {
        var result = document.querySelectorAll(container).length > 0 ? document.querySelectorAll(container) : document.querySelectorAll('[data-radial-percentage]');
        if (!result.length > 0) return;

        return result;
    };
    self.dependencies = function (container) {
        //if (d3 == undefined) return null;
        return true;
    };

})(radialPercentage);

window.addEventListener("load", function () {
   setTimeout(function () {
       radialPercentage.init(null, true, null);
   }, 200);

});

window.addEventListener("resize", function () {
   radialPercentage.init(null, false, opts);
});