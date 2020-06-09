const { BN, expectRevert } = require('openzeppelin-test-helpers');
const testHelperBuilder = require('./testHelpers/testHelper');

describe('Market Order insertion event tests', function() {
  let from;
  let dex;
  let base;
  let secondary;
  let tx;
  let testHelper;
  let wadify;
  let pricefy;
  let assertNewOrderEvent;
  let testToken;

  const initContractsAndAllowance = async accounts => {
    testHelper = testHelperBuilder();
    ({ wadify, pricefy, assertNewOrderEvent } = testHelper);
    [dex, base, secondary, testToken] = await Promise.all([
      testHelper.getDex(),
      testHelper.getBase(),
      testHelper.getSecondary(),
      testHelper.getTestToken()
    ]);
    await testHelper.setBalancesAndAllowances({ dex, base, secondary, accounts });
    from = accounts[testHelper.DEFAULT_ACCOUNT_INDEX];
  };

  contract('Dex', accounts => {
    describe('WHEN inserting a buy market order', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        tx = await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(10),
          pricefy(1.8),
          10,
          true,
          {
            from
          }
        );
      });
      it('THEN an event is emitted for the buy order', function() {
        assertNewOrderEvent({ isBuy: true, expiresInTick: '11' }, () => ({
          tx,
          baseAddress: base.address,
          secondaryAddress: secondary.address,
          MoCDex: testHelper.getMoCDex()
        }));
      });
    });
    describe('AND WHEN inserting a buy order with too much lifespan', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(10),
            pricefy(1.8),
            33,
            true,
            {
              from
            }
          ),
          'Lifespan too high'
        );
      });
    });
    describe('AND WHEN inserting a buy order with 0 exchangeableAmount', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(0),
            pricefy(1.8),
            10,
            true,
            {
              from
            }
          ),
          'Exchangeable amount cannot be zero'
        );
      });
    });
    describe('AND WHEN inserting a buy order with 0 multiplyFactor', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(base.address, secondary.address, wadify(10), pricefy(0), 10, true, {
            from
          }),
          'MultiplyFactor cannot be zero'
        );
      });
    });
  });

  contract('Dex', accounts => {
    describe('WHEN inserting a buy market order at start', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        tx = await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(10),
          pricefy(1.8),
          10,
          true,
          {
            from
          }
        );
      });
      it('THEN the event is emitted for the buy order', function() {
        assertNewOrderEvent({ isBuy: true, expiresInTick: '11' }, () => ({
          tx,
          baseAddress: base.address,
          secondaryAddress: secondary.address,
          MoCDex: testHelper.getMoCDex()
        }));
      });
    });
    describe('AND WHEN inserting a buy order at start with too much lifespan', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(10),
            pricefy(1.8),
            33,
            true,
            {
              from
            }
          ),
          'Lifespan too high'
        );
      });
    });
    describe('AND WHEN inserting a buy order at start with 0 exchangeableAmount', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(0),
            pricefy(1.8),
            10,
            true,
            {
              from
            }
          ),
          'Exchangeable amount cannot be zero'
        );
      });
    });
    describe('AND WHEN inserting a buy order at start with 0 multiplyFactor', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(base.address, secondary.address, wadify(10), pricefy(0), 10, true, {
            from
          }),
          'MultiplyFactor cannot be zero'
        );
      });
    });
  });

  contract('Dex', accounts => {
    describe('WHEN inserting a sell market order', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        tx = await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(10),
          pricefy(0.8),
          10,
          false,
          {
            from
          }
        );
      });
      it('THEN an event is emitted for the buy order', function() {
        assertNewOrderEvent({ isBuy: false, expiresInTick: '11' }, () => ({
          tx,
          baseAddress: base.address,
          secondaryAddress: secondary.address,
          MoCDex: testHelper.getMoCDex()
        }));
      });
    });
    describe('AND WHEN inserting a buy market order with too much lifespan', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(10),
            pricefy(0.8),
            55,
            false,
            {
              from
            }
          ),
          'Lifespan too high'
        );
      });
    });
    describe('AND WHEN inserting a buy market order with 0 exchangeableAmount', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(0),
            pricefy(0.8),
            10,
            false,
            {
              from
            }
          ),
          'Exchangeable amount cannot be zero'
        );
      });
    });
    describe('AND WHEN inserting a buy market order with 0 multiplyFactor', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(10),
            pricefy(0),
            10,
            false,
            {
              from
            }
          ),
          'MultiplyFactor cannot be zero'
        );
      });
    });
  });

  contract('Dex', accounts => {
    describe('WHEN inserting a sell market order at start', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        tx = await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(10),
          pricefy(0.8),
          10,
          false,
          {
            from
          }
        );
      });
      it('THEN an event is emitted for the buy market order', function() {
        assertNewOrderEvent({ isBuy: false, expiresInTick: '11' }, () => ({
          tx,
          baseAddress: base.address,
          secondaryAddress: secondary.address,
          MoCDex: testHelper.getMoCDex()
        }));
      });
    });
    describe('AND WHEN inserting a buy market order at start with too much lifespan', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(10),
            pricefy(0.8),
            55,
            false,
            {
              from
            }
          ),
          'Lifespan too high'
        );
      });
    });
    describe('AND WHEN inserting a buy market at start order with 0 exchangeableAmount', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(0),
            pricefy(0.8),
            10,
            false,
            {
              from
            }
          ),
          'Exchangeable amount cannot be zero'
        );
      });
    });
    describe('AND WHEN inserting a buy market order at start with 0 multiplyFactor', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(10),
            pricefy(0),
            10,
            false,
            {
              from
            }
          ),
          'MultiplyFactor cannot be zero'
        );
      });
    });
  });

  contract('Dex', accounts => {
    describe('WHEN inserting a sell market order after a previous one', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(5),
          pricefy(1.3),
          5,
          false,
          {
            from
          }
        );
        await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(5),
          pricefy(1.6),
          5,
          false,
          {
            from
          }
        );
        await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(5),
          pricefy(1.6),
          5,
          false,
          {
            from
          }
        );
        tx = await dex.insertMarketOrderAfter(
          base.address,
          secondary.address,
          wadify(10),
          pricefy(1.4),
          1,
          5,
          false,
          {
            from
          }
        );
      });
      it('THEN the event is emitted', function() {
        assertNewOrderEvent({ id: new BN(4), isBuy: false }, () => ({
          tx,
          baseAddress: base.address,
          secondaryAddress: secondary.address,
          MoCDex: testHelper.getMoCDex()
        }));
      });
    });
  });

  contract('Dex', accounts => {
    describe('WHEN inserting a buy market order with TestToken at start', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        tx = await dex.insertMarketOrder(
          base.address,
          testToken.address,
          wadify(10),
          pricefy(0.8),
          10,
          true,
          {
            from
          }
        );
      });
      it('THEN an event is emitted for the buy market order', function() {
        assertNewOrderEvent({ isBuy: true, expiresInTick: '11' }, () => ({
          tx,
          baseAddress: base.address,
          secondaryAddress: testToken.address,
          MoCDex: testHelper.getMoCDex()
        }));
      });
    });
    describe('AND WHEN inserting a buy market order with TestToken at start with too much lifespan', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            testToken.address,
            wadify(10),
            pricefy(0.8),
            55,
            false,
            {
              from
            }
          ),
          'Lifespan too high'
        );
      });
    });
    describe('AND WHEN inserting a buy market at start with 0 exchangeableAmount and using TestToken', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            testToken.address,
            wadify(0),
            pricefy(0.8),
            10,
            false,
            {
              from
            }
          ),
          'Exchangeable amount cannot be zero'
        );
      });
    });
    describe('AND WHEN inserting a buy market order at start with 0 multiplyFactor with TestToke', function() {
      it('THEN it should revert', function() {
        return expectRevert(
          dex.insertMarketOrder(
            base.address,
            testToken.address,
            wadify(10),
            pricefy(0),
            10,
            false,
            {
              from
            }
          ),
          'MultiplyFactor cannot be zero'
        );
      });
    });
  });

  contract('Dex', accounts => {
    describe('WHEN inserting a sell market of TestToken order after a previous one', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        await dex.insertMarketOrder(
          base.address,
          testToken.address,
          wadify(5),
          pricefy(1.3),
          5,
          false,
          {
            from
          }
        );
        await dex.insertMarketOrder(
          base.address,
          testToken.address,
          wadify(5),
          pricefy(1.6),
          5,
          false,
          {
            from
          }
        );
        await dex.insertMarketOrder(
          base.address,
          testToken.address,
          wadify(5),
          pricefy(1.6),
          5,
          false,
          {
            from
          }
        );
        tx = await dex.insertMarketOrderAfter(
          base.address,
          testToken.address,
          wadify(10),
          pricefy(1.4),
          1,
          5,
          false,
          {
            from
          }
        );
      });
      it('THEN the event is emitted', function() {
        assertNewOrderEvent({ id: new BN(4), isBuy: false }, () => ({
          tx,
          baseAddress: base.address,
          secondaryAddress: testToken.address,
          MoCDex: testHelper.getMoCDex()
        }));
      });
    });
  });

  contract('Dex buy market orders', accounts => {
    describe('GIVEN some previous buy market orders', function() {
      before(async function() {
        await initContractsAndAllowance(accounts);
        await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(2),
          pricefy(1.5),
          5,
          true,
          {
            from
          }
        );
        await dex.insertMarketOrder(
          base.address,
          secondary.address,
          wadify(3),
          pricefy(1.6),
          5,
          true,
          {
            from
          }
        );
      });
      describe('WHEN inserting a buy market order after a previous one with a giant lifespan', function() {
        it('THEN it should revert', function() {
          return expectRevert(
            dex.insertMarketOrder(
              base.address,
              secondary.address,
              wadify(3),
              pricefy(1.5),
              200,
              true,
              {
                from
              }
            ),
            'Lifespan too high'
          );
        });
      });
      describe('WHEN inserting a less competitive buy market order with same multiplyFactor', function() {
        it('THEN it should revert', function() {
          return expectRevert(
            dex.insertMarketOrderAfter(
              base.address,
              secondary.address,
              wadify(3),
              pricefy(1.5),
              2,
              5,
              true,
              {
                from
              }
            ),
            'Market Order should go after'
          );
        });
      });
      describe('AND WHEN inserting a buy market order after a previous one', function() {
        before(async function() {
          tx = await dex.insertMarketOrder(
            base.address,
            secondary.address,
            wadify(3),
            pricefy(1.7),
            0,
            true,
            {
              from
            }
          );
        });
        it('THEN the event is emitted', function() {
          assertNewOrderEvent({ id: new BN(3), price: 1.7 }, () => ({
            tx,
            baseAddress: base.address,
            secondaryAddress: secondary.address,
            MoCDex: testHelper.getMoCDex()
          }));
        });
      });
    });
  });
});
