/* Example application behavior; tty.css itself contains no JavaScript. */
(() => {
  const form = document.querySelector('#usage-form');
  const number = new Intl.NumberFormat('en-US');
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const plans = { sandbox: { floor: 24, multiplier: 1 }, studio: { floor: 180, multiplier: 1 }, dedicated: { floor: 2400, multiplier: 1.25 } };
  const show = (id, value) => { document.getElementById(id).textContent = value; };

  function calculate() {
    const value = name => Number(form.elements.namedItem(name).value);
    const planName = form.elements.namedItem('plan').value;
    const plan = plans[planName];
    const bytes = value('dimensions') * 4 + value('metadata');
    const records = value('records') * 100000;
    const writes = value('writes') * 100000;
    const queries = value('queries') * 100000;
    const collections = value('collections');
    const storageCost = records * bytes / 1e9 * 0.28;
    const writeCost = writes * bytes / 1e9 * 1.60;
    const queryCost = queries / 1e6 * 0.80;
    const collectionCost = Math.max(0, collections - 100) * 0.10;

    for (const [id, count, unit] of [['records', records, 'records'], ['writes', writes, 'records'], ['queries', queries, 'requests'], ['collections', collections, 'collections']]) {
      show(`${id}-value`, `${number.format(count)} ${unit}`);
      form.elements.namedItem(id).setAttribute('aria-valuetext', `${number.format(count)} ${unit}`);
    }
    show('storage-cost', money.format(storageCost * plan.multiplier));
    show('write-cost', money.format(writeCost * plan.multiplier));
    show('query-cost', money.format(queryCost * plan.multiplier));
    show('collection-cost', collectionCost ? money.format(collectionCost * plan.multiplier) : 'Included');
    show('minimum-note', `Includes the ${money.format(plan.floor)} ${planName} usage floor.${plan.multiplier > 1 ? ' Dedicated usage carries a 25% premium.' : ''}`);
    show('total-cost', `${money.format(Math.max(plan.floor, (storageCost + writeCost + queryCost + collectionCost) * plan.multiplier))}/month`);
  }

  form.addEventListener('input', calculate);
  form.addEventListener('reset', event => {
    // Reset fires before native defaults are restored; wait for the default action.
    setTimeout(() => { if (!event.defaultPrevented) calculate(); }, 0);
  });
  form.addEventListener('submit', event => event.preventDefault());
  calculate();
})();
