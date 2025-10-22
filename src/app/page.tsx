"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hotel, MapPin, Phone, Mail, Menu, X, Bed, Coffee, Wifi, Car, Star, Users, Shield } from "lucide-react";

export default function HotelBookingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roomTypes = [
    { 
      type: "STANDAR", 
      price: 500000, 
      image: "/images/standar.jpg",
      description: "Kamar standar nyaman dengan fasilitas dasar untuk pengalaman menginap yang menyenangkan"
    },
    { 
      type: "DELUXE", 
      price: 750000, 
      image: "/images/deluxe.jpg",
      description: "Kamar mewah dengan pemandangan kota yang menakjubkan dan fasilitas premium"
    },
    { 
      type: "FAMILY", 
      price: 1000000, 
      image: "/images/family.jpg",
      description: "Kamar luas untuk keluarga hingga 4 orang dengan ruang yang nyaman"
    }
  ];

  const features = [
    {
      icon: <Star className="w-8 h-8" />,
      title: "Pelayanan Bintang 5",
      description: "Staff profesional siap melayani 24/7"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Keamanan Terjamin",
      description: "Sistem keamanan modern dan terpercaya"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Ramah Keluarga",
      description: "Fasilitas lengkap untuk seluruh keluarga"
    }
  ];

  const handleBooking = () => {
    router.push('/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Grand Hotel</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Beranda</a>
              <a href="#products" className="text-gray-300 hover:text-white transition-colors">Produk</a>
              <a href="#prices" className="text-gray-300 hover:text-white transition-colors">Daftar Harga</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">Tentang Kami</a>
              <button 
                onClick={handleBooking}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-medium shadow-lg shadow-blue-500/30"
              >
                Pesan Kamar
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-300 hover:text-white transition-colors">Beranda</a>
              <a href="#products" className="block text-gray-300 hover:text-white transition-colors">Produk</a>
              <a href="#prices" className="block text-gray-300 hover:text-white transition-colors">Daftar Harga</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors">Tentang Kami</a>
              <button 
                onClick={() => { handleBooking(); setMobileMenuOpen(false); }}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
              >
                Pesan Kamar
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Hotel Image */}
      <div id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
          <img 
            src="/images/hotel.jpg" 
            alt="Grand Hotel" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Selamat Datang di Grand Hotel
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Pengalaman menginap terbaik dengan pelayanan berkelas dan fasilitas lengkap di jantung kota
          </p>

          <button 
            onClick={handleBooking}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-lg font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Receptionist Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/receptionist.jpg" 
                alt="Receptionist" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Pelayanan Terbaik untuk Anda</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Tim resepsionis kami yang ramah dan profesional siap membantu Anda 24/7. Kami berkomitmen memberikan pengalaman check-in yang cepat dan mudah.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Dari reservasi hingga check-out, kami memastikan setiap momen Anda di Grand Hotel menjadi pengalaman yang tak terlupakan.
              </p>
              <button 
                onClick={handleBooking}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-medium"
              >
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Tipe Kamar Kami</h2>
          <p className="text-gray-400 text-center mb-12">Pilih kamar sesuai kebutuhan Anda</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{room.type}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-bold text-blue-400 mb-4">
                    Rp {room.price.toLocaleString('id-ID')}
                    <span className="text-sm text-gray-400">/malam</span>
                  </p>
                  <p className="text-gray-400 mb-6">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-1">
                      <Wifi className="w-4 h-4" /> WiFi
                    </span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-1">
                      <Coffee className="w-4 h-4" /> Breakfast
                    </span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-1">
                      <Car className="w-4 h-4" /> Parking
                    </span>
                  </div>
                  <button 
                    onClick={handleBooking}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-medium"
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reception Area Image */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/images/receptionist.jpg" 
              alt="Reception Area" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="px-8 md:px-16 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Area Resepsi Modern</h2>
                <p className="text-lg text-gray-200">
                  Nikmati suasana lobby yang elegan dan nyaman saat tiba di hotel kami
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Table Section */}
      <div id="prices" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Daftar Harga</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-xl">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-lg">Tipe Kamar</th>
                  <th className="px-6 py-4 text-right text-lg">Harga per Malam</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-semibold">STANDAR</td>
                  <td className="px-6 py-4 text-right text-blue-400 font-semibold">Rp 500.000</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-semibold">DELUXE</td>
                  <td className="px-6 py-4 text-right text-blue-400 font-semibold">Rp 750.000</td>
                </tr>
                <tr className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-semibold">FAMILY</td>
                  <td className="px-6 py-4 text-right text-blue-400 font-semibold">Rp 1.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-900/30 border border-blue-500/50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-blue-200 mb-2">
                  <strong className="text-blue-100">Promo Spesial:</strong> Diskon 10% untuk menginap lebih dari 3 hari!
                </p>
                <p className="text-blue-200">
                  <strong className="text-blue-100">Paket Breakfast:</strong> Tambahan Rp 80.000/hari untuk sarapan buffet lengkap
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Tentang Kami</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl">
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              Grand Hotel adalah hotel bintang lima yang berlokasi di jantung kota, menawarkan pengalaman menginap yang tak terlupakan dengan pelayanan kelas dunia. Kami berkomitmen untuk memberikan kenyamanan maksimal bagi setiap tamu kami.
            </p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              Dengan fasilitas modern, kamar-kamar yang elegan, dan staff profesional yang siap melayani 24/7, Grand Hotel menjadi pilihan sempurna untuk perjalanan bisnis maupun liburan keluarga Anda.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-start gap-3 bg-gray-900/50 p-4 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Alamat</h4>
                  <p className="text-sm text-gray-400">Jl. Sudirman No. 123, Jakarta Pusat 10220</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-900/50 p-4 rounded-lg">
                <Phone className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">No. Telepon</h4>
                  <p className="text-sm text-gray-400">+62 21 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-900/50 p-4 rounded-lg">
                <Mail className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-sm text-gray-400">info@grandhotel.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Siap untuk Pengalaman Terbaik?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Pesan kamar Anda sekarang dan nikmati pelayanan berkelas di Grand Hotel
          </p>
          <button 
            onClick={handleBooking}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-lg font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105"
          >
            Pesan Kamar Sekarang
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Hotel className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold">Grand Hotel</span>
              </div>
              <p className="text-gray-400 text-sm">
                Pengalaman menginap terbaik di jantung kota
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-white text-sm transition-colors">Beranda</a>
                <a href="#products" className="block text-gray-400 hover:text-white text-sm transition-colors">Produk</a>
                <a href="#prices" className="block text-gray-400 hover:text-white text-sm transition-colors">Daftar Harga</a>
                <a href="#about" className="block text-gray-400 hover:text-white text-sm transition-colors">Tentang Kami</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+62 21 1234 5678</p>
                <p>info@grandhotel.com</p>
                <p>Jl. Sudirman No. 123</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Jam Operasional</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Check-in: 14:00</p>
                <p>Check-out: 12:00</p>
                <p>Resepsionis: 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Grand Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}