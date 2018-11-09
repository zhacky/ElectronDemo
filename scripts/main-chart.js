var data = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu','Fri'],
                datasets: [{
                    label: 'Appointments:',
                    data: [12, 19, 3]
                }],
                options: {
                    scales: {
                    yAxes: [{
                    ticks: {
                            beginAtZero:true
                            }
                     }]
                }
            },
        };
            var ctx = document.getElementById('clientChart').getContext('2d');
            var clientChart = new Chart(ctx, {
                type: 'line',
                data: data
            });
