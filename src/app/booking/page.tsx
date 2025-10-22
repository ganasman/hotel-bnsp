"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hotel, ArrowLeft } from "lucide-react";

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaPemesan: "",
    jenisKelamin: "Laki-laki",
    nomorIdentitas: "",
    tipeKamar: "STANDAR",
    harga: 500000,
    tanggalPesan: "",
    durasiMenginap: 3,
    termasukBreakfast: false,
    totalBayar: 0
  });

  const [errors, setErrors] = useState({});

  const roomPrices = {
    "STANDAR": 500000,
    "DELUXE": 750000,
    "FAMILY": 1000000
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    let updatedData = {
      ...formData,
      [name]: newValue
    };

    if (name === "tipeKamar") {
      updatedData.harga = roomPrices[value];
    }

    setFormData(updatedData);
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namaPemesan.trim()) {
      newErrors.namaPemesan = "Nama pemesan harus diisi";
    }

    if (!formData.nomorIdentitas.trim()) {
      newErrors.nomorIdentitas = "Nomor identitas harus diisi";
    } else if (formData.nomorIdentitas.length !== 16 || !/^\d+$/.test(formData.nomorIdentitas)) {
      newErrors.nomorIdentitas = "Nomor identitas harus 16 digit angka";
    }

    if (!formData.tanggalPesan) {
      newErrors.tanggalPesan = "Tanggal pesan harus diisi";
    }

    if (!formData.durasiMenginap || formData.durasiMenginap <= 0) {
      newErrors.durasiMenginap = "Durasi menginap harus diisi dengan angka positif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hitungTotalBayar = () => {
    if (!formData.durasiMenginap || formData.durasiMenginap <= 0) {
      return;
    }

    let total = formData.harga * parseInt(formData.durasiMenginap);
    
    if (parseInt(formData.durasiMenginap) > 3) {
      total = total * 0.9;
    }

    if (formData.termasukBreakfast) {
      total += 80000 * parseInt(formData.durasiMenginap);
    }

    setFormData({ ...formData, totalBayar: total });
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert(`Pemesanan berhasil!\n\nNama: ${formData.namaPemesan}\nTipe Kamar: ${formData.tipeKamar}\nTotal Bayar: Rp ${formData.totalBayar.toLocaleString('id-ID')}`);
          router.push('/');
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memesan kamar');
      }
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Grand Hotel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <h1 className="text-3xl font-bold text-center">Form Pemesanan Kamar</h1>
            <p className="text-center text-blue-100 mt-2">Lengkapi data di bawah untuk melakukan pemesanan</p>
          </div>
          
          <div className="p-8 space-y-6">
            {/* Nama Pemesan */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nama Pemesan <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="namaPemesan"
                value={formData.namaPemesan}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                placeholder="Masukkan nama pemesan"
              />
              {errors.namaPemesan && <p className="text-red-400 text-sm mt-1">{errors.namaPemesan}</p>}
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Jenis Kelamin <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer bg-gray-700/50 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Laki-laki"
                    checked={formData.jenisKelamin === "Laki-laki"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Laki-laki</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-700/50 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Perempuan"
                    checked={formData.jenisKelamin === "Perempuan"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>Perempuan</span>
                </label>
              </div>
            </div>

            {/* Nomor Identitas */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nomor Identitas (KTP/SIM) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="nomorIdentitas"
                value={formData.nomorIdentitas}
                onChange={handleInputChange}
                maxLength={16}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                placeholder="16 digit nomor identitas"
              />
              {errors.nomorIdentitas && <p className="text-red-400 text-sm mt-1">{errors.nomorIdentitas}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipe Kamar */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tipe Kamar <span className="text-red-400">*</span>
                </label>
                <select
                  name="tipeKamar"
                  value={formData.tipeKamar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                >
                  <option value="STANDAR">STANDAR - Rp 500.000</option>
                  <option value="DELUXE">DELUXE - Rp 750.000</option>
                  <option value="FAMILY">FAMILY - Rp 1.000.000</option>
                </select>
              </div>

              {/* Harga */}
              <div>
                <label className="block text-sm font-medium mb-2">Harga per Malam</label>
                <input
                  type="text"
                  value={`Rp ${formData.harga.toLocaleString('id-ID')}`}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white cursor-not-allowed font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tanggal Pesan */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tanggal Check-in <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalPesan"
                  value={formData.tanggalPesan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                />
                {errors.tanggalPesan && <p className="text-red-400 text-sm mt-1">{errors.tanggalPesan}</p>}
              </div>

              {/* Durasi Menginap */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Durasi Menginap <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="durasiMenginap"
                    value={formData.durasiMenginap}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                  />
                  <span className="text-gray-400 whitespace-nowrap">Hari</span>
                </div>
                {errors.durasiMenginap && <p className="text-red-400 text-sm mt-1">{errors.durasiMenginap}</p>}
              </div>
            </div>

            {/* Termasuk Breakfast */}
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termasukBreakfast"
                  checked={formData.termasukBreakfast}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div>
                  <span className="font-medium">Termasuk Breakfast</span>
                  <p className="text-sm text-gray-400">Tambahan Rp 80.000 per hari</p>
                </div>
              </label>
            </div>

            {/* Diskon Info */}
            {formData.durasiMenginap > 3 && (
              <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-green-200">Diskon 10% Aktif!</p>
                  <p className="text-sm text-green-300">Anda mendapat diskon untuk menginap lebih dari 3 hari</p>
                </div>
              </div>
            )}

            {/* Total Bayar */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-lg border border-blue-500/50">
              <label className="block text-sm font-medium mb-3 text-blue-200">Total Bayar</label>
              <div className="text-4xl font-bold text-white mb-2">
                Rp {formData.totalBayar.toLocaleString('id-ID')}
              </div>
              <p className="text-sm text-gray-400">
                {formData.durasiMenginap > 0 && `${formData.durasiMenginap} malam × Rp ${formData.harga.toLocaleString('id-ID')}`}
                {formData.durasiMenginap > 3 && " (Diskon 10%)"}
                {formData.termasukBreakfast && ` + Breakfast`}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={hitungTotalBayar}
                className="flex-1 px-6 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium text-lg"
              >
                Hitung Total Bayar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-colors font-medium text-lg shadow-lg shadow-blue-500/30"
              >
                Konfirmasi Pemesanan
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-500 rounded-lg transition-colors font-medium text-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}