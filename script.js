
const intensityByObs = {
  'Aquecimento': { color: '#00C853', value: 0.25 },
  'Isometria':   { color: '#2979FF', value: 0.50 },
  'Aumenta a carga': { color: '#FF5252', value: 0.80 }
};

function buildTable(day, items) {
  const wrap = document.createElement('div');
  wrap.className = 'container card';

  const h2 = document.createElement('h2');
  h2.textContent = day;
  wrap.appendChild(h2);

  const legend = document.createElement('div');
  legend.className = 'legend';
  legend.innerHTML = `
    <div class="item"><span class="swatch" style="background:#00C853"></span>Aquecimento</div>
    <div class="item"><span class="swatch" style="background:#FF5252"></span>Aumenta a carga</div>
    <div class="item"><span class="swatch" style="background:#2979FF"></span>Isometria</div>
  `;
  wrap.appendChild(legend);

  const tableWrap = document.createElement('div');
  tableWrap.className = 'table-wrap';
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr><th>Exercício</th><th>Séries/Reps</th><th>Observações</th></tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');

  items.forEach(it => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td'); td1.textContent = it.exercicio || '';
    const td2 = document.createElement('td'); td2.textContent = it.series || '';
    const td3 = document.createElement('td');
    if (it.obs) {
      const span = document.createElement('span');
      span.className = 'badge';
      span.textContent = it.obs;
      const meta = intensityByObs[it.obs];
      if (meta) span.style.background = meta.color;
      td3.appendChild(span);

      const prog = document.createElement('div');
      prog.className = 'progress';
      const bar = document.createElement('div');
      bar.className = 'bar';
      if (meta) {
        bar.style.background = meta.color;
        bar.style.width = (meta.value * 100) + '%';
      }
      prog.appendChild(bar);
      td3.appendChild(prog);
    } else {
      td3.textContent = '';
    }
    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
    tbody.appendChild(tr);
  });

  tableWrap.appendChild(table);
  wrap.appendChild(tableWrap);
  return wrap;
}

function render(day) {
  const main = document.getElementById('content');
  main.innerHTML = '';
  main.appendChild(buildTable(day, window.WORKOUTS[day] || []));
}

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.day);
    });
  });
  render('Segunda');
});
