/**
 * Simulador de ROI para distribuidores.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var $ = function (id) { return document.getElementById(id); };

    var marginInput = $('input-margin');
    var conversionInput = $('input-conversion');
    var planSelect = $('select-plan');
    if (!marginInput || !conversionInput || !planSelect) return;

    var marginLabel = $('label-margin');
    var conversionLabel = $('label-conversion');
    var calcSales = $('calc-sales');
    var calcIncome = $('calc-income');
    var calcCost = $('calc-cost');
    var calcNet = $('calc-net');

    var clpFormatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    function formatCLP(value) {
      return clpFormatter.format(value);
    }

    function calculateROI() {
      var margin = parseInt(marginInput.value, 10);
      var conversion = parseInt(conversionInput.value, 10) / 100;
      var parts = planSelect.value.split(',');
      var cost = Number(parts[0]);
      var leads = Number(parts[1]);

      marginLabel.textContent = formatCLP(margin);
      conversionLabel.textContent = (conversion * 100).toFixed(0) + '%';

      var salesCount = Math.round(leads * conversion);
      var totalIncome = salesCount * margin;
      var netROI = totalIncome - cost;

      calcSales.textContent = salesCount + ' Ventas';
      calcIncome.textContent = formatCLP(totalIncome);
      calcCost.textContent = '-' + formatCLP(cost);

      if (netROI > 0) {
        calcNet.innerHTML = formatCLP(netROI) +
          ' <span class="text-xs block text-zinc-400 font-normal mt-1 leading-tight">¡Excelente rentabilidad esperada!</span>';
        calcNet.className = 'text-2xl md:text-4xl font-black text-center text-emerald-400 mt-2 break-words whitespace-normal';
      } else {
        calcNet.innerHTML = formatCLP(netROI) +
          ' <span class="text-xs block text-zinc-400 font-normal mt-1 leading-tight">Ajuste su margen o tasa de cierre para rentabilizar el plan</span>';
        calcNet.className = 'text-2xl md:text-4xl font-black text-center text-rose-400 mt-2 break-words whitespace-normal';
      }
    }

    marginInput.addEventListener('input', calculateROI);
    conversionInput.addEventListener('input', calculateROI);
    planSelect.addEventListener('change', calculateROI);
    calculateROI();
  });
})();