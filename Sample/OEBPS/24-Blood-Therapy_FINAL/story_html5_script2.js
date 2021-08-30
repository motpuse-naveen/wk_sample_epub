window.DS = {};
window.globals = {
  DATA_PATH_BASE: '',
  HAS_FRAME: true,
  HAS_SLIDE: true,

  lmsPresent: false,
  tinCanPresent: false,
  cmi5Present: false,
  aoSupport: false,
  scale: 'noscale',
  captureRc: false,
  browserSize: 'optimal',
  bgColor: '#FFFFFF',
  features: 'ModernPlayerRefresh,MultipleQuizTracking,TextStyleHyperlinks',
  themeName: 'classic',
  preloaderColor: '#FFFFFF',
  suppressAnalytics: false,
  productChannel: 'stable',
  publishSource: 'storyline',
  aid: 'aid|9b6a2f5b-7444-4815-843c-13e25dc87579',
  cid: 'c3394c6a-2977-4410-bb61-2b47c6160b8b',
  playerVersion: '3.50.24832.0',
  maxIosVideoElements: 5,

  
  parseParams: function(qs) {
    if (window.globals.parsedParams != null) {
      return window.globals.parsedParams;
    }
    qs = (qs || window.location.search.substr(1)).split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1]).trim()] =
        decodeURIComponent(tokens[2]).trim();
    }
    window.globals.parsedParams = params;
    return params;
  }

};

(function() {

  var classTypes = [ 'desktop', 'mobile', 'phone', 'tablet' ];

  var addDeviceClasses = function(prefix, testObj) {
    var curr, i;
    for (i = 0; i < classTypes.length; i++) {
      curr = classTypes[i];
      if (testObj[curr]) {
        document.body.classList.add(prefix + curr);
      }
    }
  };

  var params = window.globals.parseParams(),
      isDevicePreview = params.devicepreview === '1',
      isPhoneOverride = params.deviceType === 'phone' || (isDevicePreview && params.phone == '1'),
      isTabletOverride = (params.deviceType === 'tablet' || isDevicePreview) && !isPhoneOverride,
      isMobileOverride = isPhoneOverride || isTabletOverride;

  var deviceView = {
    desktop: !window.isMobile.any && !isMobileOverride,
    mobile: window.isMobile.any || isMobileOverride,
    phone: isPhoneOverride || (window.isMobile.phone && !isTabletOverride),
    tablet: isTabletOverride || window.isMobile.tablet
  };

  window.globals.deviceView = deviceView;
  window.isMobile.desktop = !window.isMobile.any;
  window.isMobile.mobile = window.isMobile.any;

  addDeviceClasses('view-', deviceView);

})();
