import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { plans } from '@/lib/schema';

export async function GET() {
  try {
    const allPlans = await db.select().from(plans);
    
    return NextResponse.json({
      success: true,
      data: allPlans,
      message: 'Planos obtidos com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor',
        message: 'Não foi possível buscar os planos'
      },
      { status: 500 }
    );
  }
}