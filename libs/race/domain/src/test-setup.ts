import 'jest-preset-angular';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeValidStateTransition(): R;
      toBeValidStateTransitions(): R;
    }
  }
}

function evaluateStateTransition(method) {
  let exception: Error = null;

  try {
    method();
  } catch (e) {
    exception = e;
  }
  if (exception) {
    return {
      pass: false,
      message: () => `Expected ${method} to be a valid state transition.`,
    };
  } else {
    return {
      pass: true,
      message: () => `Expected ${method} not to be a valid state transition.`,
    };
  }
}

expect.extend({
  toBeValidStateTransition(method) {
    return evaluateStateTransition(method);
  },
});

/*
test( 'valid state transition', () => {
  const now = new Date();
  expect( () => now.getTime() ).toBeValidStateTransition();
})
*/

expect.extend({
  toBeValidStateTransitions(methods) {
    let returnValue;
    methods.every((method) => {
      returnValue = evaluateStateTransition(method);
      if (!returnValue.pass) return returnValue;
    });
    return returnValue;
  },
});
