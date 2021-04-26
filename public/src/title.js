'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_React$Component) {
    _inherits(Title, _React$Component);

    function Title() {
        _classCallCheck(this, Title);

        return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
    }

    _createClass(Title, [{
        key: 'render',
        value: function render() {
            var mysytle = {
                //padding: '300',
                cursor: 'pointer',
                //marginWidth: '300',
                position: 'absolute',
                left: '50%',
                //top: '50%',
                transform: 'translate(-50%, -50%)'

            };
            return React.createElement(
                'small',
                { id: 'finger', style: mysytle, className: 'text-muted', onClick: function onClick() {
                        return Fingerpaint.prototype.goToHome();
                    } },
                React.createElement(
                    'h1',
                    null,
                    'FINGERPAINT'
                )
            );
        }
    }]);

    return Title;
}(React.Component);

var titleContainer = document.querySelector('#title_container');
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(React.createElement(Title, null), titleContainer);
    }
});