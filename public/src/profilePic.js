var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfilePic = function (_React$Component) {
    _inherits(ProfilePic, _React$Component);

    function ProfilePic() {
        _classCallCheck(this, ProfilePic);

        return _possibleConstructorReturn(this, (ProfilePic.__proto__ || Object.getPrototypeOf(ProfilePic)).apply(this, arguments));
    }

    _createClass(ProfilePic, [{
        key: "render",
        value: function render() {
            var photoURL = Fingerpaint.prototype.getProfilePic();
            return React.createElement("img", { src: photoURL, id: "proPic", width: "100", height: "100", "class": "img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}", alt: "profile image" });
        }
    }]);

    return ProfilePic;
}(React.Component);

var ProfilePictureContainer = document.querySelector('#profile_picture_container');
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(React.createElement(ProfilePic, null), ProfilePictureContainer);
    }
});