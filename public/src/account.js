'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasswordForm = function (_React$Component) {
    _inherits(PasswordForm, _React$Component);

    function PasswordForm() {
        _classCallCheck(this, PasswordForm);

        return _possibleConstructorReturn(this, (PasswordForm.__proto__ || Object.getPrototypeOf(PasswordForm)).apply(this, arguments));
    }

    _createClass(PasswordForm, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("label", { htmlFor: "inputOldPassword", className: "visually-hidden" }),
                React.createElement("input", { type: "password", id: "inputOldPassword", className: "form-control", placeholder: "old password" }),
                React.createElement("label", { htmlFor: "inputPassword", className: "visually-hidden" }),
                React.createElement("input", { type: "password", id: "inputPassword", className: "form-control", placeholder: "new password" }),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", "btn-lg": "true", "btn-block": "true", onClick: function onClick() {
                            return Fingerpaint.prototype.setPassword();
                        } },
                    "Submit"
                ),
                React.createElement("div", { id: "passworderror" })
            );
        }
    }]);

    return PasswordForm;
}(React.Component);

var UserNameForm = function (_React$Component2) {
    _inherits(UserNameForm, _React$Component2);

    function UserNameForm() {
        _classCallCheck(this, UserNameForm);

        return _possibleConstructorReturn(this, (UserNameForm.__proto__ || Object.getPrototypeOf(UserNameForm)).apply(this, arguments));
    }

    _createClass(UserNameForm, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("label", { htmlFor: "inputUserName", className: "visually-hidden" }),
                React.createElement("input", { type: "username", id: "inputUserName", className: "form-control", placeholder: "username" }),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", "btn-lg": "true", "btn-block": "true", onClick: function onClick() {
                            return Fingerpaint.prototype.setDisplayName();
                        } },
                    "Submit"
                )
            );
        }
    }]);

    return UserNameForm;
}(React.Component);

var PhotoURL = function (_React$Component3) {
    _inherits(PhotoURL, _React$Component3);

    function PhotoURL() {
        _classCallCheck(this, PhotoURL);

        return _possibleConstructorReturn(this, (PhotoURL.__proto__ || Object.getPrototypeOf(PhotoURL)).apply(this, arguments));
    }

    _createClass(PhotoURL, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("label", { htmlFor: "inputURL", className: "visually-hidden" }),
                React.createElement("input", { id: "inputProfilePic", className: "form-control", placeholder: "Profile Picture URL" }),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", "btn-lg": "true", "btn-block": "true", onClick: function onClick() {
                            return Fingerpaint.prototype.setProfilePic();
                        } },
                    "Submit"
                )
            );
        }
    }]);

    return PhotoURL;
}(React.Component);

var Account = function (_React$Component4) {
    _inherits(Account, _React$Component4);

    function Account(props) {
        _classCallCheck(this, Account);

        var _this4 = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, props));

        _this4.state = {
            passwordForm: false,
            userNameForm: false,
            profilePicForm: false
        };
        _this4._passwordClick = _this4._passwordClick.bind(_this4);
        _this4._userNameClick = _this4._userNameClick.bind(_this4);
        _this4._photoURLClick = _this4._photoURLClick.bind(_this4);
        return _this4;
    }

    _createClass(Account, [{
        key: "_passwordClick",
        value: function _passwordClick() {
            this.setState({
                passwordForm: true
            });
        }
    }, {
        key: "_userNameClick",
        value: function _userNameClick() {
            this.setState({
                userNameForm: true
            });
        }
    }, {
        key: "_photoURLClick",
        value: function _photoURLClick() {
            this.setState({
                profilePicForm: true
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    { type: "button", id: "changeUserName", className: "btn btn-primary", "btn-lg": "true", "btn-block": "true", onClick: this._userNameClick },
                    "Change Username"
                ),
                this.state.userNameForm ? ReactDOM.render(React.createElement(UserNameForm, null), accountContainer) : null,
                React.createElement(
                    "button",
                    { type: "button", id: "changePassword", className: "btn btn-primary", "btn-lg": "true", "btn-block": "true", onClick: this._passwordClick },
                    "Change Password"
                ),
                this.state.passwordForm ? ReactDOM.render(React.createElement(PasswordForm, null), accountContainer) : null,
                React.createElement(
                    "button",
                    { type: "button", id: "changePicture", className: "btn btn-primary", "btn-lg": "true", "btn-block": "true", onClick: this._photoURLClick },
                    "Change Profile Picture"
                ),
                this.state.profilePicForm ? ReactDOM.render(React.createElement(PhotoURL, null), accountContainer) : null,
                React.createElement(
                    "button",
                    { type: "button", onClick: function onClick() {
                            return Fingerpaint.prototype.logout();
                        }, name: "n1", id: "logout", className: "btn btn-primary", "btn-lg": "true", "btn-block": "true" },
                    "Logout"
                )
            );
        }
    }]);

    return Account;
}(React.Component);

var accountContainer = document.querySelector('#account_function_container');
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(React.createElement(Account, null), accountContainer);
    }
});