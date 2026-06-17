import { createFileRoute } from '@tanstack/react-router';
import { Lock } from 'lucide-react';

export const Route = createFileRoute('/secret')({
  component: SecretPage,
});

function SecretPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 shadow-lg shadow-cyan-500/10">
        <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
        <h1 className="text-4xl font-black text-white mb-4">
          Página Secreta
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Esta es una página secreta del proyecto TanStack Start. 
          Solo quienes conocen la URL pueden acceder a este contenido 
          exclusivo. Bienvenido.
        </p>
      </div>
    </div>
  );
}
