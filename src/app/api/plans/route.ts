import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Dados mock enquanto corrigimos conexão com banco
    const mockPlans = [
      {
        id: '1',
        name: 'starter',
        displayName: 'Plano Starter',
        maxProjects: 1,
        maxKeywords: 10,
        price: 29.90,
        active: true
      },
      {
        id: '2', 
        name: 'pro',
        displayName: 'Plano Pro',
        maxProjects: 5,
        maxKeywords: 100,
        price: 99.90,
        active: true
      }
    ];
    
    return NextResponse.json({
      success: true,
      data: mockPlans,
      message: 'Planos obtidos com sucesso (dados mock)'
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