import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Ambil semua booking
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST - Buat booking baru
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validasi nomor identitas harus 16 digit
    if (data.nomorIdentitas.length !== 16) {
      return NextResponse.json(
        { error: 'Nomor identitas harus 16 digit' },
        { status: 400 }
      );
    }

    // Cek apakah nomor identitas sudah ada
    const existing = await prisma.booking.findUnique({
      where: { nomorIdentitas: data.nomorIdentitas }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Nomor identitas sudah terdaftar' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        namaPemesan: data.namaPemesan,
        jenisKelamin: data.jenisKelamin,
        nomorIdentitas: data.nomorIdentitas,
        tipeKamar: data.tipeKamar,
        harga: data.harga,
        tanggalPesan: new Date(data.tanggalPesan),
        durasiMenginap: parseInt(data.durasiMenginap),
        termasukBreakfast: data.termasukBreakfast,
        totalBayar: data.totalBayar
      }
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}