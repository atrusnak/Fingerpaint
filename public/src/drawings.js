'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawings = function (_React$Component) {
    _inherits(Drawings, _React$Component);

    function Drawings() {
        _classCallCheck(this, Drawings);

        return _possibleConstructorReturn(this, (Drawings.__proto__ || Object.getPrototypeOf(Drawings)).apply(this, arguments));
    }

    _createClass(Drawings, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "table table-striped table-inverse table-responsive" },
                React.createElement("thead", { className: "thead-inverse" }),
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement("td", { scope: "row" }),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw1.jpg", width: "150", height: "150" })
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw2.jpg", width: "150", height: "150" })
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw3.jpg", width: "150", height: "150" })
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw4.jpg", width: "150", height: "150" })
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement("td", { scope: "row" }),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw4.jpg", width: "150", height: "150" })
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw3.jpg", width: "150", height: "150" })
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw2.jpg", width: "150", height: "150" })
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "a",
                                { id: "profile", onClick: function onClick() {
                                        return Fingerpaint.prototype.goToDraw();
                                    } },
                                React.createElement("img", { src: "draw1.jpg", width: "150", height: "150" })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Drawings;
}(React.Component);

var titleContainer = document.querySelector('#drawings_container');
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(React.createElement(Drawings, null), titleContainer);
    }
});