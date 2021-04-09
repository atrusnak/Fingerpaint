var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawNew = function (_React$Component) {
    _inherits(DrawNew, _React$Component);

    function DrawNew() {
        _classCallCheck(this, DrawNew);

        return _possibleConstructorReturn(this, (DrawNew.__proto__ || Object.getPrototypeOf(DrawNew)).apply(this, arguments));
    }

    _createClass(DrawNew, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "a",
                { className: "anchorButton", id: "plus", onClick: function onClick() {
                        return Fingerpaint.prototype.goToDraw();
                    } },
                React.createElement(
                    "h1",
                    null,
                    "+"
                )
            );
        }
    }]);

    return DrawNew;
}(React.Component);

var drawcontainer = document.querySelector('#draw_new_container');
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(React.createElement(DrawNew, null), drawcontainer);
    }
});