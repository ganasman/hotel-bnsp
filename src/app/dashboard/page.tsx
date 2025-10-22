"use client";

import { useState, useEffect } from "react";
import { 
  Hotel, Search, Filter, Calendar, User, DollarSign, 
  TrendingUp, Users, Bed, Eye, Trash2, Edit, X,
  ChevronLeft, ChevronRight, Download, LogOut, RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // Fetch bookings from API
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
      setFilteredBookings(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = [...bookings];

    // Search by name or ID
    if (searchTerm) {
      result = result.filter(booking => 
        booking.namaPemesan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.nomorIdentitas.includes(searchTerm)
      );
    }

    // Filter by room type
    if (filterType !== "all") {
      result = result.filter(booking => booking.tipeKamar === filterType);
    }

    // Filter by date
    if (filterDate) {
      result = result.filter(booking => {
        const bookingDate = new Date(booking.tanggalPesan).toISOString().split('T')[0];
        return bookingDate === filterDate;
      });
    }

    setFilteredBookings(result);
    setCurrentPage(1);
  }, [searchTerm, filterType, filterDate, bookings]);

  // Statistics
  const stats = {
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalBayar, 0),
    standarRooms: bookings.filter(b => b.tipeKamar === "STANDAR").length,
    deluxeRooms: bookings.filter(b => b.tipeKamar === "DELUXE").length,
    familyRooms: bookings.filter(b => b.tipeKamar === "FAMILY").length
  };

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      try {
        const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete booking');
        
        setBookings(bookings.filter(b => b.id !== id));
        alert("Booking berhasil dihapus!");
      } catch (err) {
        alert("Gagal menghapus booking: " + err.message);
      }
    }
  };

  const handleViewDetail = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Nama", "Jenis Kelamin", "No. Identitas", "Tipe Kamar", "Tanggal", "Durasi", "Breakfast", "Total"];
    const rows = filteredBookings.map(b => [
      b.id,
      b.namaPemesan,
      b.jenisKelamin,
      b.nomorIdentitas,
      b.tipeKamar,
      new Date(b.tanggalPesan).toLocaleDateString('id-ID'),
      b.durasiMenginap,
      b.termasukBreakfast ? "Ya" : "Tidak",
      b.totalBayar
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterDate("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-xs text-gray-400">Grand Hotel Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={fetchBookings}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Booking</p>
                <p className="text-3xl font-bold">{stats.totalBookings}</p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">Rp {(stats.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm mb-1">Standar</p>
                <p className="text-3xl font-bold">{stats.standarRooms}</p>
              </div>
              <Bed className="w-10 h-10 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Deluxe</p>
                <p className="text-3xl font-bold">{stats.deluxeRooms}</p>
              </div>
              <Bed className="w-10 h-10 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm mb-1">Family</p>
                <p className="text-3xl font-bold">{stats.familyRooms}</p>
              </div>
              <Bed className="w-10 h-10 text-pink-200" />
            </div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari nama atau nomor identitas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                />
              </div>
            </div>

            {/* Filter by Room Type */}
            <div className="w-full lg:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
              >
                <option value="all">Semua Tipe</option>
                <option value="STANDAR">STANDAR</option>
                <option value="DELUXE">DELUXE</option>
                <option value="FAMILY">FAMILY</option>
              </select>
            </div>

            {/* Filter by Date */}
            <div className="w-full lg:w-48">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={resetFilters}
                className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || filterType !== "all" || filterDate) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-400">Filter aktif:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                  Search: {searchTerm}
                </span>
              )}
              {filterType !== "all" && (
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">
                  Tipe: {filterType}
                </span>
              )}
              {filterDate && (
                <span className="px-3 py-1 bg-green-600 rounded-full text-sm">
                  Tanggal: {new Date(filterDate).toLocaleDateString('id-ID')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-xl p-6 text-center">
            <p className="text-red-200">Error: {error}</p>
            <button 
              onClick={fetchBookings}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && !error && (
          <>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Nama Pemesan</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">No. Identitas</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Tipe Kamar</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Durasi</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Total Bayar</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {currentBookings.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Tidak ada data booking</p>
                        </td>
                      </tr>
                    ) : (
                      currentBookings.map((booking, index) => (
                        <tr key={booking.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 text-sm">{startIndex + index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-semibold">{booking.namaPemesan}</p>
                                <p className="text-xs text-gray-400">{booking.jenisKelamin}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">{booking.nomorIdentitas}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.tipeKamar === 'STANDAR' ? 'bg-yellow-600' :
                              booking.tipeKamar === 'DELUXE' ? 'bg-purple-600' :
                              'bg-pink-600'
                            }`}>
                              {booking.tipeKamar}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {new Date(booking.tanggalPesan).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4 text-sm">{booking.durasiMenginap} hari</td>
                          <td className="px-6 py-4 font-semibold text-green-400">
                            Rp {booking.totalBayar.toLocaleString('id-ID')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleViewDetail(booking)}
                                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                                title="Lihat Detail"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(booking.id)}
                                className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredBookings.length)} dari {filteredBookings.length} data
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === i + 1
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center rounded-t-xl">
              <h2 className="text-2xl font-bold">Detail Booking</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">ID Booking</p>
                  <p className="font-semibold">{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Tanggal Booking</p>
                  <p className="font-semibold">
                    {new Date(selectedBooking.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-bold text-lg mb-3">Informasi Tamu</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Nama Pemesan</p>
                    <p className="font-semibold">{selectedBooking.namaPemesan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Jenis Kelamin</p>
                    <p className="font-semibold">{selectedBooking.jenisKelamin}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-400 mb-1">Nomor Identitas</p>
                    <p className="font-semibold font-mono">{selectedBooking.nomorIdentitas}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-bold text-lg mb-3">Detail Pemesanan</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Tipe Kamar</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedBooking.tipeKamar === 'STANDAR' ? 'bg-yellow-600' :
                      selectedBooking.tipeKamar === 'DELUXE' ? 'bg-purple-600' :
                      'bg-pink-600'
                    }`}>
                      {selectedBooking.tipeKamar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Harga per Malam</p>
                    <p className="font-semibold">Rp {selectedBooking.harga.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Tanggal Check-in</p>
                    <p className="font-semibold">
                      {new Date(selectedBooking.tanggalPesan).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Durasi Menginap</p>
                    <p className="font-semibold">{selectedBooking.durasiMenginap} hari</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Termasuk Breakfast</p>
                    <p className="font-semibold">
                      {selectedBooking.termasukBreakfast ? (
                        <span className="text-green-400">✓ Ya</span>
                      ) : (
                        <span className="text-red-400">✗ Tidak</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Bayar</p>
                    <p className="font-bold text-2xl text-green-400">
                      Rp {selectedBooking.totalBayar.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 flex gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedBooking.id);
                    setShowDetailModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg transition-colors font-medium"
                >
                  Hapus Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}