"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hotel, MapPin, Phone, Mail, Menu, X, Coffee, Wifi, Car, Star, Users, Shield } from "lucide-react";

export default function HotelBookingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      <style jsx>{`
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/95 backdrop-blur-lg shadow-lg' : 'bg-black/70 backdrop-blur-md'} border-b border-gray-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
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
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg shadow-blue-600/30"
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
          <div className="md:hidden bg-gray-950/98 backdrop-blur-lg border-t border-gray-700">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-gray-300 hover:text-white transition-colors py-2">Beranda</a>
              <a href="#products" className="block text-gray-300 hover:text-white transition-colors py-2">Produk</a>
              <a href="#prices" className="block text-gray-300 hover:text-white transition-colors py-2">Daftar Harga</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors py-2">Tentang Kami</a>
              <button 
                onClick={() => { handleBooking(); setMobileMenuOpen(false); }}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-blue-600/30"
              >
                Pesan Kamar
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-gray-900/70 to-gray-900 z-10"></div>
          <Image 
            src="/images/hotel.jpg" 
            alt="Grand Hotel" 
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Selamat Datang di Grand Hotel
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Pengalaman menginap terbaik dengan pelayanan berkelas dan fasilitas lengkap di jantung kota
          </p>

          <button 
            onClick={handleBooking}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 text-base font-medium hover:scale-105 shadow-lg shadow-blue-600/30"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-600 transition-all duration-300 card-hover">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Receptionist Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden h-[500px] group">
              <Image 
                src="/images/receptionist.jpg" 
                alt="Receptionist" 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Pelayanan Terbaik untuk Anda</h2>
              <p className="text-gray-300 mb-4">
                Tim resepsionis kami yang ramah dan profesional siap membantu Anda 24/7. Kami berkomitmen memberikan pengalaman check-in yang cepat dan mudah.
              </p>
              <p className="text-gray-300 mb-6">
                Dari reservasi hingga check-out, kami memastikan setiap momen Anda di Grand Hotel menjadi pengalaman yang tak terlupakan.
              </p>
              <button 
                onClick={handleBooking}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg shadow-blue-600/30"
              >
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Tipe Kamar Kami</h2>
          <p className="text-gray-400 text-center mb-12">Pilih kamar sesuai kebutuhan Anda</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-600 transition-all duration-300 card-hover">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={room.image} 
                    alt={room.type}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 z-10">
                    <h3 className="text-xl font-bold text-white">{room.type}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-2xl font-bold text-blue-400 mb-3">
                    Rp {room.price.toLocaleString('id-ID')}
                    <span className="text-sm text-gray-400 font-normal">/malam</span>
                  </p>
                  <p className="text-gray-300 mb-6 text-sm">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-700 rounded text-sm flex items-center gap-1">
                      <Wifi className="w-4 h-4" /> WiFi
                    </span>
                    <span className="px-3 py-1 bg-gray-700 rounded text-sm flex items-center gap-1">
                      <Coffee className="w-4 h-4" /> Breakfast
                    </span>
                    <span className="px-3 py-1 bg-gray-700 rounded text-sm flex items-center gap-1">
                      <Car className="w-4 h-4" /> Parking
                    </span>
                  </div>
                  <button 
                    onClick={handleBooking}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg shadow-blue-600/30"
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Hotel Kami</h2>
          <p className="text-gray-400 text-center mb-12">Lihat suasana dan fasilitas Grand Hotel</p>
          
          <div className="relative bg-black rounded-lg overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/pxEV1A5mTYM"
              title="Video Grand Hotel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Reception Area Image */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-lg overflow-hidden h-[400px] group">
            <Image 
              src="/images/resto.jpg" 
              alt="Restaurant Area" 
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center z-10">
              <div className="px-8 md:px-16 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Area Restaurant Modern</h2>
                <p className="text-base text-gray-200">
                  Nikmati berbagai hidangan lezat di restaurant kami yang mengusung konsep modern dengan suasana nyaman dan elegan. Cocok untuk santapan bersama keluarga atau pertemuan bisnis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Table Section */}
      <div id="prices" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Daftar Harga</h2>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
            <table className="w-full">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-6 py-4 text-left text-base font-semibold">Tipe Kamar</th>
                  <th className="px-6 py-4 text-right text-base font-semibold">Harga per Malam</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 font-medium">STANDAR</td>
                  <td className="px-6 py-4 text-right text-blue-400 font-medium">Rp 500.000</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 font-medium">DELUXE</td>
                  <td className="px-6 py-4 text-right text-blue-400 font-medium">Rp 750.000</td>
                </tr>
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 font-medium">FAMILY</td>
                  <td className="px-6 py-4 text-right text-blue-400 font-medium">Rp 1.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-900/30 border border-blue-600/40 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-200 mb-2">
                  <strong className="text-white">Promo Spesial:</strong> Diskon 10% untuk menginap lebih dari 3 hari!
                </p>
                <p className="text-gray-200">
                  <strong className="text-white">Paket Breakfast:</strong> Tambahan Rp 80.000/hari untuk sarapan buffet lengkap
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tentang Kami</h2>
          
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Grand Hotel adalah hotel bintang lima yang berlokasi di jantung kota, menawarkan pengalaman menginap yang tak terlupakan dengan pelayanan kelas dunia. Kami berkomitmen untuk memberikan kenyamanan maksimal bagi setiap tamu kami.
            </p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              Dengan fasilitas modern, kamar-kamar yang elegan, dan staff profesional yang siap melayani 24/7, Grand Hotel menjadi pilihan sempurna untuk perjalanan bisnis maupun liburan keluarga Anda.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-start gap-3 bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Alamat</h4>
                  <p className="text-sm text-gray-400">Jl. Sudirman No. 123, Jakarta Pusat 10220</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                <Phone className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">No. Telepon</h4>
                  <p className="text-sm text-gray-400">+62 21 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-900 p-4 rounded-lg hover:bg-gray-700 transition-colors">
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
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap untuk Pengalaman Terbaik?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Pesan kamar Anda sekarang dan nikmati pelayanan berkelas di Grand Hotel
          </p>
          <button 
            onClick={handleBooking}
            className="px-10 py-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 text-base font-medium hover:scale-105"
          >
            Pesan Kamar Sekarang
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-700 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
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
          
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Grand Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}