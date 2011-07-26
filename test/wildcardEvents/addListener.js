var simpleEvents = require('nodeunit').testCase;

var file = '../../lib/eventemitter2';

module.exports = simpleEvents({

  setUp: function (callback) {
    var EventEmitter2;

    if(typeof require !== 'undefined') {
      EventEmitter2 = require(file).EventEmitter2;
    }
    else {
      EventEmitter2 = window.EventEmitter2;
    }

    this.emitter = new EventEmitter2({ 
      wildcard: true,
      verbose: true 
    });
    callback();
  },

  tearDown: function (callback) {
    //clean up?
    callback();
  },

  '1. Add a single listener on a single event.': function (test) {
    
    var emitter = this.emitter;
    var type = 'some.listener.bar';

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });

    test.equal(emitter.listeners(type).length, 1, 'There are three emitters');

    test.expect(1);
    test.done();

  },

  '2. Add two listeners on a single event.': function (test) {
    
    var emitter = this.emitter;
    var type = 'some.listener.bar';

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });

    test.equal(emitter.listeners(type).length, 2, 'There are three emitters');

    test.expect(1);
    test.done();

  },
  '3. Add three listeners on a single event.': function (test) {
    
    var emitter = this.emitter;
    var type = 'some.listener.bar';

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });
    
    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });
    
    test.equal(emitter.listeners(type).length, 3, 'There are three emitters');

    test.expect(1);
    test.done();

  },
  '4. Add two listeners to two different events.': function (test) {

    var emitter = this.emitter;
    var type = 'some.listener.bar';

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });
    
    emitter.on('test2', function () {
      test.ok(true, 'The event was raised');
    });

    emitter.on('test2', function () {
      test.ok(true, 'The event was raised');
    });

    test.equal(emitter.listeners(type).length, 2, 'There are two emitters');
    test.equal(emitter.listeners('test2').length, 2, 'There are two emitters');

    test.expect(2);
    test.done();
  },

  '5. Never adding any listeners should yield a listeners array with the length of 0.': function (test) {
    var emitter = this.emitter;
    var type = 'some.listener.bar';

    emitter.on(type, function () {
      test.ok(true, 'The event was raised');
    });

    test.equal(emitter.listeners('test2').length, 0, 'There are no emitters');

    test.expect(1);
    test.done();
  },

  '6. the listener added should be the right listener.': function (test) {
    var emitter = this.emitter;
    var type = 'some.listener.bar';
    var f = function () {};

    emitter.on(type, f);
    test.equal(emitter.listeners(type).length, 1, 'There are is one emitters');
    test.equal(emitter.listeners(type)[0], f, 'The function should be f');

    test.expect(2);
    test.done();

  },
  
  '7. A listener should respond to two wildcards seperated by a delimiter.': function (test) {
    var emitter = this.emitter;
    var type = '*.*';
    var f = function () {
      text.ok(true, 'the event was fired')
    };

    emitter.on(type, f);
    console.log(emitter._events)
    emitter.emit('foo.foo');

    test.expect(2);
    test.done();
  }

});
