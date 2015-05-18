
/*
Copyright (c) 2012 ElevenBlack
Written by Ciocanel Razvan (chocksy.com)
 */


/*
A self-contained loader library
 */

(function() {
  window.widgetLoader = (function(window, document) {
    "use strict";
    var $s, addSideButton, addWidget, addWidgetListeners, assignModal, cssNumber, defaults, elements, error, isMobile, loadModule, make, openModal, trace;
    defaults = {
      widget_domain: '//location.for.iframe.widget',
      domain: '//domain.for.iframe.widget',
      modal_width: false,
      modal_height: false,
      iframe_widget: false,
      iframe_width: "100%",
      iframe_height: "100%",
      side_btn: true
    };
    cssNumber = {
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    };
    elements = {
      side_btn_content: '<div id="WDG_sideBtn_ctn"><a href="#" id="WDG_sideBtn">Errors Widget</a></div>',
      side_btn: "#WDG_sideBtn"
    };
    assignModal = function() {
      return $s('.el-modal').on('click', (function(_this) {
        return function(e) {
          var element, moduleInfo, widget_token;
          e.preventDefault();
          element = e.currentTarget;
          widget_token = element.getAttribute('data-widget');
          moduleInfo = JSON.stringify({
            url: widget_token
          });
          return loadModule({
            data: moduleInfo
          });
        };
      })(this));
    };
    loadModule = function(e) {
      var info_received;
      info_received = JSON.parse(e.data);
      window.ELopts.widget_url = info_received.url;

      /*
      window.ELopts.domain = window.ELopts.widget_domain
      window.ELopts.domain = info_received.domain if info_received.domain!=undefined
      
      if isMobile()
        window.open(window.ELopts.domain+"?id="+window.ELopts.widget_url,'_blank')
      else
       */
      return openModal();
    };
    openModal = function() {
      var current_height, current_width, outerHeight, outerWidth, widget_height, widget_width;
      current_height = make().getWindow('height');
      current_width = make().getWindow('width');
      widget_width = window.ELopts.modal_width ? window.ELopts.modal_width : current_width / 1.2;
      widget_height = window.ELopts.modal_height ? window.ELopts.modal_height : current_height / 1.6;
      outerWidth = typeof widget_width === "number" ? current_width - widget_width : current_width * parseInt(widget_width) / 100;
      outerHeight = typeof widget_height === "number" ? current_height - widget_height : current_height * parseInt(widget_height) / 100;
      return picoModal({
        content: "<style>\n  /**/\n  /* normal state */\n  /**/\n  .epic-form .toggle i:before {\n    background-color: #cc3d3d;  \n  }\n  .epic-form .button {\n    background-color: #cc3d3d;\n  }\n\n\n  /**/\n  /* hover state */\n  /**/\n  .epic-form .input:hover input,\n  .epic-form .select:hover select,\n  .epic-form .textarea:hover textarea,\n  .epic-form .radio:hover i,\n  .epic-form .checkbox:hover i,\n  .epic-form .toggle:hover i {\n    border-color: #dc9596;\n  }\n  .epic-form .rating input + label:hover,\n  .epic-form .rating input + label:hover ~ label {\n    color: #cc3d3d;\n  }\n\n\n  /**/\n  /* focus state */\n  /**/\n  .epic-form .input input:focus,\n  .epic-form .select select:focus,\n  .epic-form .textarea textarea:focus,\n  .epic-form .radio input:focus + i,\n  .epic-form .checkbox input:focus + i,\n  .epic-form .toggle input:focus + i {\n    border-color: #cc3d3d;\n  }\n\n\n  /**/\n  /* checked state */\n  /**/\n  .epic-form .radio input + i:after {\n    background-color: #cc3d3d;  \n  }\n  .epic-form .checkbox input + i:after {\n    color: #cc3d3d;\n  }\n  .epic-form .radio input:checked + i,\n  .epic-form .checkbox input:checked + i,\n  .epic-form .toggle input:checked + i {\n    border-color: #cc3d3d;  \n  }\n  .epic-form .rating input:checked ~ label {\n    color: #cc3d3d; \n  }\n  /**/\n  /* font */\n  /**/\n  @import url(http://fonts.googleapis.com/css?family=Open+Sans:300,400,700);\n\n\n  /**/\n  /* defaults */\n  /**/\n  .epic-form {\n    margin: 0;\n    outline: none;\n    box-shadow: 0 0 20px rgba(0,0,0,.3);\n    font: 13px/1.55 'Open Sans', Helvetica, Arial, sans-serif;\n    color: #666;\n  }\n  .epic-form * {\n    margin: 0;\n    padding: 0;\n  }\n  .epic-form header {\n    display: block;\n    padding: 20px 30px; \n    border-bottom: 1px solid rgba(0,0,0,.1);\n    background: rgba(248,248,248,.9);\n    font-size: 25px;\n    font-weight: 300;\n    color: #232323;\n  }\n  .epic-form fieldset {\n    display: block; \n    padding: 25px 30px 5px;\n    border: none;\n    background: rgba(255,255,255,.9);\n  }\n  .epic-form fieldset + fieldset {\n    border-top: 1px solid rgba(0,0,0,.1);\n  }\n  .epic-form section {\n    margin-bottom: 20px;\n  }\n  .epic-form footer {\n    display: block;\n    padding: 15px 30px 25px;\n    border-top: 1px solid rgba(0,0,0,.1);\n    background: rgba(248,248,248,.9);\n  }\n  .epic-form footer:after {\n    content: '';\n    display: table;\n    clear: both;\n  }\n  .epic-form a {\n    color: #2da5da;\n  }\n  .epic-form .label {\n    display: block;\n    margin-bottom: 6px;\n    line-height: 19px;\n  }\n  .epic-form .label.col {\n    margin: 0;\n    padding-top: 10px;\n  }\n  .epic-form .note {\n    margin-top: 6px;\n    padding: 0 1px;\n    font-size: 11px;\n    line-height: 15px;\n    color: #999;\n  }\n  .epic-form .input,\n  .epic-form .select,\n  .epic-form .textarea,\n  .epic-form .radio,\n  .epic-form .checkbox,\n  .epic-form .toggle,\n  .epic-form .button {\n    position: relative;\n    display: block;\n  }\n  .epic-form .input input,\n  .epic-form .select select,\n  .epic-form .textarea textarea {\n    display: block;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    width: 100%;\n    height: 39px;\n    padding: 8px 10px;\n    outline: none;\n    border-width: 2px;\n    border-style: solid;\n    border-radius: 0;\n    background: #fff;\n    font: 15px/19px 'Open Sans', Helvetica, Arial, sans-serif;\n    color: #404040;\n    appearance: normal;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n  }\n\n  /**/\n  /* textareas */\n  /**/\n  .epic-form .textarea textarea {\n    height: auto;\n    resize: none;\n  }\n  .epic-form .textarea-resizable textarea {\n    resize: vertical; \n  }\n  .epic-form .textarea-expandable textarea {\n    height: 39px;\n  }\n  .epic-form .textarea-expandable textarea:focus {\n    height: auto;\n  }\n\n  /**/\n  /* buttons */\n  /**/\n  .epic-form .button {\n    float: right;\n    height: 39px;\n    overflow: hidden;\n    margin: 10px 0 0 20px;\n    padding: 0 25px;\n    outline: none;\n    border: 0;\n    font: 300 15px/39px 'Open Sans', Helvetica, Arial, sans-serif;\n    text-decoration: none;\n    color: #fff;\n    cursor: pointer;\n  }\n\n  /**/\n  /* grid */\n  /**/\n  .epic-form .row {\n    margin: 0 -15px;\n  }\n  .epic-form .row:after {\n    content: '';\n    display: table;\n    clear: both;\n  }\n  .epic-form .col {\n    float: left;\n    min-height: 1px;\n    padding-right: 15px;\n    padding-left: 15px;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n  }\n  .epic-form .col-1 {\n    width: 8.33%;\n  }\n  .epic-form .col-2 {\n    width: 16.66%;\n  }\n  .epic-form .col-3 {\n    width: 25%;\n  }\n  .epic-form .col-4 {\n    width: 33.33%;\n  }\n  .epic-form .col-5 {\n    width: 41.66%;\n  }\n  .epic-form .col-6 {\n    width: 50%;\n  }\n  .epic-form .col-8 {\n    width: 66.67%;\n  }\n  .epic-form .col-9 {\n    width: 75%;\n  }\n  .epic-form .col-10 {\n    width: 83.33%;\n  }\n  @media screen and (max-width: 600px) {\n    .epic-form .col {\n      float: none;\n      width: 100%;\n    }\n  }\n\n  /**/\n  /* normal state */\n  /**/\n  .epic-form .input input,\n  .epic-form .select select,\n  .epic-form .textarea textarea,\n  .epic-form .radio i,\n  .epic-form .checkbox i,\n  .epic-form .toggle i,\n  .epic-form .icon-append,\n  .epic-form .icon-prepend {\n    border-color: #e5e5e5;\n    transition: border-color 0.3s;\n    -o-transition: border-color 0.3s;\n    -ms-transition: border-color 0.3s;\n    -moz-transition: border-color 0.3s;\n    -webkit-transition: border-color 0.3s;\n  }\n  .epic-form .toggle i:before {\n    background-color: #2da5da;  \n  }\n  .epic-form .rating label {\n    color: #ccc;\n    transition: color 0.3s;\n    -o-transition: color 0.3s;\n    -ms-transition: color 0.3s;\n    -moz-transition: color 0.3s;\n    -webkit-transition: color 0.3s;\n  }\n  .epic-form .button {\n    background-color: #2da5da;\n    opacity: 0.8;\n    transition: opacity 0.2s;\n    -o-transition: opacity 0.2s;\n    -ms-transition: opacity 0.2s;\n    -moz-transition: opacity 0.2s;\n    -webkit-transition: opacity 0.2s;\n  }\n  .epic-form .button.button-secondary {\n    background-color: #b3b3b3;\n  }\n  .epic-form .icon-append,\n  .epic-form .icon-prepend {\n    color: #ccc;\n  }\n\n\n  /**/\n  /* hover state */\n  /**/\n  .epic-form .input:hover input,\n  .epic-form .select:hover select,\n  .epic-form .textarea:hover textarea,\n  .epic-form .radio:hover i,\n  .epic-form .checkbox:hover i,\n  .epic-form .toggle:hover i {\n    border-color: #8dc9e5;\n  }\n  .epic-form .rating input + label:hover,\n  .epic-form .rating input + label:hover ~ label {\n    color: #2da5da;\n  }\n  .epic-form .button:hover {\n    opacity: 1;\n  }\n\n\n  /**/\n  /* focus state */\n  /**/\n  .epic-form .input input:focus,\n  .epic-form .select select:focus,\n  .epic-form .textarea textarea:focus,\n  .epic-form .radio input:focus + i,\n  .epic-form .checkbox input:focus + i,\n  .epic-form .toggle input:focus + i {\n    border-color: #2da5da;\n  }\n\n\n  /**/\n  /* checked state */\n  /**/\n  .epic-form .radio input + i:after {\n    background-color: #2da5da;  \n  }\n  .epic-form .checkbox input + i:after {\n    color: #2da5da;\n  }\n  .epic-form .radio input:checked + i,\n  .epic-form .checkbox input:checked + i,\n  .epic-form .toggle input:checked + i {\n    border-color: #2da5da;  \n  }\n  .epic-form .rating input:checked ~ label {\n    color: #2da5da; \n  }\n\n\n  /**/\n  /* error state */\n  /**/\n  .epic-form .state-error input,\n  .epic-form .state-error select,\n  .epic-form .state-error textarea,\n  .epic-form .radio.state-error i,\n  .epic-form .checkbox.state-error i,\n  .epic-form .toggle.state-error i {\n    background: #fff0f0;\n  }\n  .epic-form .state-error select + i {\n    background: #fff0f0;\n    box-shadow: 0 0 0 12px #fff0f0;\n  }\n  .epic-form .toggle.state-error input:checked + i {\n    background: #fff0f0;\n  }\n  .epic-form .state-error + em {\n    display: block;\n    margin-top: 6px;\n    padding: 0 1px;\n    font-style: normal;\n    font-size: 11px;\n    line-height: 15px;\n    color: #ee9393;\n  }\n  .epic-form .rating.state-error + em {\n    margin-top: -4px;\n    margin-bottom: 4px;\n  }\n\n\n  /**/\n  /* success state */\n  /**/\n  .epic-form .state-success input,\n  .epic-form .state-success select,\n  .epic-form .state-success textarea,\n  .epic-form .radio.state-success i,\n  .epic-form .checkbox.state-success i,\n  .epic-form .toggle.state-success i {\n    background: #f0fff0;\n  }\n  .epic-form .state-success select + i {\n    background: #f0fff0;\n    box-shadow: 0 0 0 12px #f0fff0;\n  }\n  .epic-form .toggle.state-success input:checked + i {\n    background: #f0fff0;\n  }\n  .epic-form .note-success {\n    color: #6fb679;\n  }\n\n\n  /**/\n  /* disabled state */\n  /**/\n  .epic-form .input.state-disabled input,\n  .epic-form .select.state-disabled,\n  .epic-form .textarea.state-disabled,\n  .epic-form .radio.state-disabled,\n  .epic-form .checkbox.state-disabled,\n  .epic-form .toggle.state-disabled,\n  .epic-form .button.state-disabled {\n    cursor: default;\n    opacity: 0.5;\n  }\n  .epic-form .input.state-disabled:hover input,\n  .epic-form .select.state-disabled:hover select,\n  .epic-form .textarea.state-disabled:hover textarea,\n  .epic-form .radio.state-disabled:hover i,\n  .epic-form .checkbox.state-disabled:hover i,\n  .epic-form .toggle.state-disabled:hover i {\n    border-color: #e5e5e5;\n  }\n\n\n  /**/\n  /* submited state */\n  /**/\n  .epic-form .message {\n    display: none;\n    color: #6fb679;\n  }\n  .epic-form .message i {\n    display: block;\n    margin: 0 auto 20px;\n    width: 81px;\n    height: 81px;\n    border: 1px solid #6fb679;\n    border-radius: 50%;\n    font-size: 30px;\n    line-height: 81px;\n  }\n  .epic-form.submited fieldset,\n  .epic-form.submited footer {\n    display: none;\n  }\n  .epic-form.submited .message {\n    display: block;\n    padding: 25px 30px;\n    background: rgba(255,255,255,.9);\n    font: 300 18px/27px 'Open Sans', Helvetica, Arial, sans-serif;\n    text-align: center;\n  }\n\n  /**/\n  /* modal */\n  /**/\n  .epic-form-modal {\n    position: fixed;\n    z-index: 1;\n    display: none;\n    width: 400px;\n  }\n  .epic-form-modal-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    display: none;\n    width: 100%;\n    height: 100%;\n    background: rgba(0,0,0,0.7);\n  }\n  html, body {\n    margin: 0;\n    padding: 0;\n    background-attachment: fixed;\n    background-position: 50% 50%;\n    background-size: cover;\n  }\n  a {\n    text-decoration: underline;\n  }\n  a:hover {\n    text-decoration: none;\n  }\n  .body-s {\n    max-width: 400px;\n  }\n  .modal {\n    padding: 25px 30px;\n    background: rgba(255,255,255,0.9);\n    font: 13px/1.55 'Open Sans', Helvetica, Arial, sans-serif;\n    color: #666;\n  }\n  .modal a {\n    color: #2da5da;\n  }\n\n  @media screen and (max-width: 600px) {\n    .body {\n      padding: 20px;\n    }\n  }\n</style>\n<div class=\"body\">      \n  <form action=\"\" class=\"epic-form\" />\n    <header>We are sorry that you landed on this error page.\nLet us know and we will get back to you once we fix the issue.</header>\n    \n    <fieldset>\n      <section>\n        <label class=\"label\">Your Email</label>\n        <label class=\"input\">\n          <input type=\"email\" placeholder=\"Enter your email\" required/>\n        </label>\n      </section>\n    </fieldset>\n    <fieldset>          \n      <section>\n        <label class=\"label\">Details/Notes on the Error (What were you trying to do?)</label>\n        <label class=\"textarea\">\n          <textarea rows=\"4\"></textarea>\n        </label>\n      </section>\n    </fieldset>\n    <footer>\n      <button type=\"submit\" class=\"button\">Submit Error</button>\n      <button type=\"button\" class=\"button button-secondary\" onclick=\"window.history.back();\">Back</button>\n    </footer>\n  </form>\n</div>",
        overlayStyles: {
          backgroundColor: "#333",
          opacity: "0.3"
        },
        modalStyles: {
          width: widget_width,
          height: widget_height,
          top: "20%",
          background: "#fff",
          boxShadow: "0px 0px 7px #444",
          border: "1px solid #444",
          borderRadius: "3px",
          marginLeft: -outerWidth / 2 + "px",
          overflowY: "scroll"
        }
      });
    };
    addSideButton = function() {
      var moduleInfo;
      $s('body').append(elements.side_btn_content);
      moduleInfo = JSON.stringify({
        url: window.ELopts.widget_url
      });
      $s(elements.side_btn).stylize({
        position: "fixed",
        top: "20%",
        left: "0",
        width: "90px",
        height: "90px",
        background: "url(https://i.imgur.com/jxoB4das.png)",
        textIndent: "-9999px",
        boxShadow: "2px 1px 4px #ccc",
        borderRadius: "5px"
      });
      $s(elements.side_btn).on("click", (function(_this) {
        return function(event) {
          loadModule({
            data: moduleInfo
          });
          return event.preventDefault();
        };
      })(this));
      return false;
    };
    addWidget = function() {
      var $el, url, widget_iframe_html;
      url = window.ELopts.domain + "?id=" + window.ELopts.widget_url + ("?theme=" + window.ELopts.theme);
      widget_iframe_html = '<iframe id="iframe_widget" src="' + url + '" class="iframe-class" style="width:100%;height:100%;" frameborder="0" allowtransparency="true"></iframe>';
      $el = $s(window.ELopts.widget_container);
      return $el.html(widget_iframe_html);
    };
    isMobile = function() {
      return /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
    };
    $s = function(a, b) {
      var elem, fas;
      a = a.match(/^(\W)?(.*)/);
      elem = (b || document)["getElement" + (a[1] ? (a[1] === "#" ? "ById" : "sByClassName") : "sByTagName")](a[2]);
      fas = {
        elem: elem,
        data: function(dataAttr) {
          return elem.getAttribute("data-" + dataAttr);
        },
        html: function(content) {
          elem.innerHTML = content;
          return fas;
        },
        stylize: function(styles) {
          var prop, type;
          styles = styles || {};
          if (typeof styles.opacity !== "undefined") {
            styles.filter = "alpha(opacity=" + (styles.opacity * 100) + ")";
          }
          for (prop in styles) {
            if (styles.hasOwnProperty(prop)) {
              type = typeof styles[prop];
              if (type === "number" && !cssNumber[prop]) {
                styles[prop] += "px";
              }
              elem.style[prop] = styles[prop];
            }
          }
          return fas;
        },
        append: function(html) {
          var c, el;
          c = document.createElement("p");
          c.innerHTML = html;
          el = elem;
          if (elem.length) {
            el = elem[0];
          }
          el.appendChild(c.firstChild);
          return fas;
        },
        destroy: function() {
          if (!!elem) {
            document.body.removeChild(elem);
          }
          return fas;
        },
        on: function(eventName, handler) {
          var el, i;
          if (elem.length) {
            elements = elem;
          } else {
            elements = [elem];
          }
          if (elements.length > 0) {
            i = 0;
            while (i < elements.length) {
              el = elements[i];
              if (el.addEventListener) {
                el.addEventListener(eventName, handler);
              } else if (el.attachEvent) {
                el.attachEvent("on" + eventName, function() {
                  return handler.call(elem);
                });
              }
              i++;
            }
          }
        }
      };
      return fas;
    };
    make = function() {
      var fas;
      fas = {
        extend: function(out) {
          var i, key, obj;
          out = out || {};
          i = 1;
          while (i < arguments.length) {
            obj = arguments[i];
            if (!obj) {
              continue;
            }
            for (key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === "object") {
                  extend(out[key], obj[key]);
                } else {
                  out[key] = obj[key];
                }
              }
            }
            i++;
          }
          return out;
        },
        getWindow: function(type) {
          var d, e, g, w, x, y;
          w = window;
          d = document;
          e = d.documentElement;
          g = d.getElementsByTagName('body')[0];
          x = w.innerWidth || e.clientWidth || g.clientWidth;
          y = w.innerHeight || e.clientHeight || g.clientHeight;
          if (type === 'width') {
            return x;
          }
          if (type === 'height') {
            return y;
          }
        }
      };
      return fas;
    };
    addWidgetListeners = function() {
      var eventMethod, eventer, messageEvent;
      trace("adding listener for selecting the date for showing time");
      eventMethod = (window.addEventListener ? "addEventListener" : "attachEvent");
      eventer = window[eventMethod];
      messageEvent = (eventMethod === "attachEvent" ? "onmessage" : "message");
      return eventer(messageEvent, ((function(_this) {
        return function(e) {
          return loadModule(e);
        };
      })(this)), false);
    };
    trace = function(s) {
      if (window["console"] !== undefined) {
        return window.console.log("widgetLoader: " + s);
      }
    };
    error = function(s) {
      if (window["console"] !== undefined) {
        return window.console.error("widgetLoader: " + s);
      }
    };
    return function(options) {
      window.ELopts = make().extend({}, defaults, options);
      trace("constructor");
      if (window.ELopts.iframe_widget) {
        addWidget();
        addWidgetListeners();
      }
      if (window.ELopts.side_btn) {
        addSideButton();
      }
      assignModal();
      return false;
    };
  })(window, document);

  window.onload = function() {
    if (_lopts.widget_container === void 0) {
      _lopts.widget_container = 'body';
    }
    return widgetLoader(_lopts);
  };

  window.reporterror = function(formObj) {
    var contactBtn, currentdate, datetime, id, myFirebaseRef, onSubmitComplete;
    onSubmitComplete = function(error) {
      var contactBtn, contactForm, contactResponse;
      contactForm = document.getElementById('contact-form');
      contactResponse = document.getElementById('contact-response');
      contactBtn = document.getElementById('btn-submit');
      contactBtn.disabled = false;
      if (error) {
        contactResponse.innerHTML = '<div class="alert alert-danger">Sorry. Could not submit the error report.</div>';
      } else {
        contactResponse.innerHTML = '<div class="alert alert-success">Thanks for submitting your error report!</div>';
        contactForm.style.display = 'none';
      }
    };
    contactBtn = document.getElementById('btn-submit');
    myFirebaseRef = new Firebase('https://epiclogger.firebaseio.com/errors');
    id = window.ELopts.widget_url;
    currentdate = new Date;
    datetime = currentdate.getDate() + '/' + currentdate.getMonth() + 1 + '/' + currentdate.getFullYear() + ' @ ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
    myFirebaseRef.push({
      'id': id,
      'email': formObj.InputEmail.value,
      'notes': formObj.InputMessage.value,
      'timestamp': datetime
    }, onSubmitComplete);
    contactBtn.disabled = true;
    return false;
  };

}).call(this);
