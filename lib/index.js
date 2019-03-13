'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReferenceDataText = function (_React$Component) {
  _inherits(ReferenceDataText, _React$Component);

  function ReferenceDataText(props) {
    _classCallCheck(this, ReferenceDataText);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getRefDataText = function (type, value) {
      var urlPrefix = _this.host + '/api/refdata/';
      return new Promise(function (resolve, reject) {
        fetch(urlPrefix + type + '/' + value, { credentials: 'same-origin' }).then(function (response) {
          if (response.status === 200) {
            response.text().then(function (data) {
              resolve(data);

              if (!_this.props.noCache) {
                if (!window.referenceDataTextCache) {
                  window.referenceDataTextCache = [];
                }
                window.referenceDataTextCache[type + '-' + value] = data;
              }
            });
          }
        });
      });
    };

    _this.state = {
      text: ''
    };
    _this.host = process.env.API_HOST || '';
    return _this;
  }

  ReferenceDataText.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        type = _props.type,
        value = _props.value;


    if (!this.props.noCache) {
      if (window.referenceDataTextCache) {
        if (window.referenceDataTextCache[type + '-' + value]) {
          this.setState({
            text: window.referenceDataTextCache[type + '-' + value]
          });
          return;
        }
      }
    }

    if (value) {
      this.getRefDataText(type, value).then(function (result) {
        _this2.setState({
          text: result
        });
      });
    }
  };

  ReferenceDataText.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    var type = nextProps.type,
        value = nextProps.value;


    if (!this.props.noCache) {
      if (window.referenceDataTextCache) {
        if (window.referenceDataTextCache[type + '-' + value]) {
          this.setState({
            text: window.referenceDataTextCache[type + '-' + value]
          });
          return;
        }
      }
    }

    if (value) {
      this.getRefDataText(type, value).then(function (result) {
        _this3.setState({
          text: result
        });
      });
    }
  };

  ReferenceDataText.prototype.render = function render() {
    return _react2.default.createElement(
      'span',
      null,
      this.state.text
    );
  };

  return ReferenceDataText;
}(_react2.default.Component);

exports.default = ReferenceDataText;
module.exports = exports['default'];