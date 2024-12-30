let barangList = JSON.parse(localStorage.getItem('barangList')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderListBarang();
});

function tambahBarang() {
    const nama = document.getElementById('namaBarang').value;
    const harga = document.getElementById('hargaBarang').value;

    if (nama && harga) {
        barangList.push({ nama, harga });
        saveToLocalStorage();
        alert(`Barang '${nama}' dengan harga ${harga} berhasil ditambahkan.`);
        document.getElementById('namaBarang').value = '';
        document.getElementById('hargaBarang').value = '';
        renderListBarang();
    } else {
        alert('Harap isi nama dan harga barang.');
    }
}

function cariBarang() {
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const hasilPencarian = document.getElementById('hasilPencarian');
    hasilPencarian.innerHTML = '';

    const hasil = barangList.filter(barang => barang.nama.toLowerCase().includes(keyword));

    if (hasil.length > 0) {
        hasil.forEach(barang => {
            const li = document.createElement('li');
            li.textContent = `Nama: ${barang.nama}, Harga: ${barang.harga}`;
            hasilPencarian.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Barang tidak ditemukan';
        hasilPencarian.appendChild(li);
    }
}

function toggleListBarang() {
    const listBarang = document.getElementById('listBarang');
    listBarang.style.display = listBarang.style.display === 'none' ? 'block' : 'none';
    renderListBarang();
}

function renderListBarang() {
    const listContainer = document.getElementById('barangListContainer');
    listContainer.innerHTML = '';

    barangList.forEach((barang, index) => {
        const li = document.createElement('li');
        li.className = 'barang-item';

        const text = document.createElement('span');
        text.textContent = `Nama: ${barang.nama}, Harga: ${barang.harga}`;

        const actions = document.createElement('div');
        actions.className = 'barang-actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editBarang(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.style.backgroundColor = '#dc3545';
        deleteButton.onclick = () => deleteBarang(index);

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(text);
        li.appendChild(actions);

        listContainer.appendChild(li);
    });
}

function editBarang(index) {
    const barang = barangList[index];
    const namaBaru = prompt('Masukkan nama baru:', barang.nama);
    const hargaBaru = prompt('Masukkan harga baru:', barang.harga);

    if (namaBaru && hargaBaru) {
        barangList[index] = { nama: namaBaru, harga: hargaBaru };
        saveToLocalStorage();
        alert('Barang berhasil diperbarui!');
        renderListBarang();
    } else {
        alert('Perubahan dibatalkan.');
    }
}

function deleteBarang(index) {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        barangList.splice(index, 1);
        saveToLocalStorage();
        alert('Barang berhasil dihapus!');
        renderListBarang();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('barangList', JSON.stringify(barangList));
}
