export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Rankify API
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            SEO Rank Tracker - Agora com Next.js para Vercel
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Status: Funcionando
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">📋 Endpoints Disponíveis</h2>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-100 px-2 py-1 rounded">/api/health</code> - Status da API</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">/api/plans</code> - Listar planos</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">/api/auth/*</code> - Autenticação (em desenvolvimento)</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">/api/projects/*</code> - Projetos (em desenvolvimento)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">⚡ Melhorias</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Compatível com Vercel serverless</li>
              <li>✅ Next.js App Router</li>
              <li>✅ TypeScript nativo</li>
              <li>✅ Drizzle ORM otimizado</li>
              <li>⏳ Migração de todos os endpoints</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>🔄 Em migração:</strong> Convertendo de Hono.js para Next.js para compatibilidade total com Vercel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
