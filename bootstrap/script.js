// script.js

// Daftar warna earth tone tambahan
const earthTones = [
    '#f4a261', // Coklat pastel
    '#2a9d8f', // Olive
    '#264653', // Dark Slate Blue
    '#e9c46a', // Sand
    '#f6bd60', // Light Orange
    '#8d99ae', // Cool Grey
    '#d8e2dc', // Light Beige
    '#b9b3b3', // Soft Grey
    '#6d8d6b', // Moss Green
    '#a2b29f'  // Sage Green
];

// Fungsi untuk menghasilkan warna RGB acak
function getRandomEarthTone() {
    return earthTones[Math.floor(Math.random() * earthTones.length)];
}

// Fungsi untuk menghasilkan warna latar belakang acak
function getRandomColor() {
    // Menghasilkan warna earth tone atau warna RGB acak
    return Math.random() < 0.5 ? getRandomEarthTone() : 
           `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Terapkan warna acak pada setiap kartu
function applyRandomColors() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.backgroundColor = getRandomColor();
    });
}

// Jalankan fungsi saat halaman dimuat
window.onload = applyRandomColors;


document.addEventListener('DOMContentLoaded', function() {
    fetch('pages.json')
        .then(response => response.json())
        .then(data => {
            // Mengurutkan data berdasarkan index secara menurun
            data.sort((a, b) => b.index - a.index);

            const container = document.getElementById('cards-container');
            data.forEach(item => {
                // Parsing tanggal untuk mendapatkan format yang diinginkan
                const dateParts = item.date.split(' ');
                const day = dateParts[0].padStart(2, '0');
                const month = getMonthNumber(dateParts[1].toLowerCase());
                const year = dateParts[2];
                const formattedDate = `${day}-${month}-${year}`;
                
                // Menghasilkan path dengan format numerik
                const path = `pages/00${item.index}. Day ${item.index} (${formattedDate})/`;

                // Menyusun tittle dengan nilai default jika tidak ada
                const tittle = item.tittle ? item.tittle : 'No Title Available';

                // Membuat HTML kartu dengan nama bulan tetap sebagai teks
                const cardHtml = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title card-title-bold">${tittle}</h5>
                                <p class="card-date">${item.date}</p>
                                <a href="${path}" class="btn btn-pink-soft">View Detail</a>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHtml;
            });

            // Terapkan warna acak setelah kartu ditambahkan
            applyRandomColors();
        })
        .catch(error => console.error('Error loading the JSON file:', error));
});

// Fungsi untuk mendapatkan nomor bulan dari nama bulan
function getMonthNumber(monthName) {
    const months = {
        'januari': '01',
        'februari': '02',
        'maret': '03',
        'april': '04',
        'mei': '05',
        'juni': '06',
        'juli': '07',
        'agustus': '08',
        'september': '09',
        'oktober': '10',
        'november': '11',
        'desember': '12'
    };
    return months[monthName] || '00'; // Return '00' jika bulan tidak dikenali
}
