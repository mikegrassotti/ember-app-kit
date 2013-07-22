define("appkit/tests/acceptance/index_test",
  ["appkit/routes/index","appkit/app"],
  function(Index, App) {
    "use strict";

    module("Acceptances - Index", {
      setup: function(){
        App.reset();
      }
    });

    test("index renders", function(){
      expect(3);

      visit('/').then(function(){
        ok(exists("h2:contains('Welcome to Ember.js')"));

        var list = find("ul li");
        equal(list.length, 3);
        equal(list.text(), "redyellowblue");
      });
    });

  });
define("appkit/tests/test_helper",
  [],
  function() {
    "use strict";
    document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

    Ember.testing = true;

    var App = requireModule('appkit/app');

    App.rootElement = '#ember-testing';
    App.setupForTesting();
    App.injectTestHelpers();

    function exists(selector) {
      return !!find(selector).length;
    }

    window.exists = exists;

    Ember.Container.prototype.stub = function(fullName, instance) {
      instance.destroy = instance.destroy || function() {};
      this.cache.dict[fullName] = instance;
    };

  });
define("appkit/tests/test_loader",
  [],
  function() {
    "use strict";
    // TODO: load based on params
    Ember.keys(define.registry).filter(function(key) {
      return (/\_test/).test(key);
    }).forEach(requireModule);
  });
define("appkit/tests/unit/routes/index_test",
  ["appkit/routes/index","appkit/app"],
  function(Index, App) {
    "use strict";

    var route;

    module("Unit - IndexRoute", {
      setup: function(){
        route = App.__container__.lookup('route:index');
      }
    });

    test("it exists", function(){
      ok(route);
      ok(route instanceof Ember.Route);
    });

    test("#model", function(){
      deepEqual(route.model(), ['red', 'yellow', 'blue']);
    });

  });