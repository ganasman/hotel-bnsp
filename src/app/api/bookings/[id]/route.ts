import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Ambil booking by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id }
    });

    if (!booking) {
      return NextResponse.json(
{ error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PUT - Update booking
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        namaPemesan: data.namaPemesan,
        jenisKelamin: data.jenisKelamin,
        tipeKamar: data.tipeKamar,
        harga: data.harga,
        tanggalPesan: new Date(data.tanggalPesan),
        durasiMenginap: parseInt(data.durasiMenginap),
        termasukBreakfast: data.termasukBreakfast,
        totalBayar: data.totalBayar
      }
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.booking.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}