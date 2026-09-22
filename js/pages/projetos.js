export function initProjetos() {
  const canvas = document.querySelector('#grafico-acoes');

  if (!canvas) return;

  new Chart(canvas, {
    type: 'doughnut',

    data: {
      labels: ['Resgates', 'Adoções', 'Voluntariado', 'Doações'],

      datasets: [
        {
          data: [30, 35, 20, 15],
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          position: 'bottom',
        },

        title: {
          display: true,
          text: 'Distribuição das ações da ONG',
        },
      },
    },
  });
}
