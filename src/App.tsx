import { GiftIcon, Users, Zap } from "lucide-react";
import Logo from "./assets/logo.jpg";
import { Toasts, type Toast } from "./components/toasts";
import { useEffect, useRef, useState } from "react";

const nomes: string[] = [
  "Ana", "Lucas", "Mariana", "Pedro", "Júlia", "Gabriel", "Laura", "Rafael",
  "Isabella", "João", "Beatriz", "Guilherme", "Larissa", "Matheus", "Amanda",
  "Vinícius", "Camila", "Felipe", "Letícia", "Leonardo", "Sofia", "Daniel",
  "Vitória", "André", "Bruna", "Rodrigo", "Yasmin", "Gustavo", "Nicole",
  "Thiago", "Nathalia", "Diego", "Alana", "Eduardo", "Renata", "Samuel",
  "Heloísa", "Caio", "Giovanna", "Henrique", "Mirela", "Bruno", "Paula",
  "Jonathan", "Aline", "Enzo", "Carla", "Fernando", "Tatiane", "Alexandre",
  "Cristiane", "Vitor", "Lorena", "Otávio", "Melissa", "Antônio", "Patrícia",
  "Raul", "Luana", "Igor", "Bianca", "Roberto", "Clara", "Renan", "Sandra",
  "Cauã", "Elaine", "Joaquim", "Márcia", "Alan", "Helena", "Sérgio", "Débora",
  "Caíque", "Priscila", "Fábio", "Graziella", "Ricardo", "Tainá", "Marcelo",
  "Rayssa", "Murilo", "Evelyn", "Danilo", "Esther", "Nathan", "Carol", "Raissa",
  "Jeferson", "Tânia", "Alex", "Valéria", "Cristiano", "Jéssica", "Luan",
  "Kelly", "William", "Simone", "Ruan", "Michele"
];

function getRandomName() {
  return nomes[Math.floor(Math.random() * nomes.length)];
}

export default function App() {
  const [count, setCount] = useState(30);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const intervalRef = useRef<any | null>(null);
  const timeoutRef = useRef<any | null>(null);

  useEffect(() => {
    function runCycle() {
      setCount((prev) => {
        const next = prev > 1 ? prev - 1 : 1;

        if (next === 1 && intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        return next;
      });

      const newToast: Toast = {
        id: Date.now(),
        message: `${getRandomName()} entrou no grupo`,
      };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 5000);
    }

    timeoutRef.current = setTimeout(() => {
      runCycle();

      intervalRef.current = setInterval(() => {
        runCycle();
      }, 6000);
    }, 2000);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full min-h-screen pb-10 bg-neutral-50 text-white">
      <header className="bg-green-600 h-12 flex items-center justify-center">
        <h1 className="flex items-center gap-2 font-semibold text-sm">
          <GiftIcon size={20} />
          PARTICIPE DO GRUPO VIP GRATUITAMENTE
        </h1>
      </header>

      <main className="w-full max-w-md mx-auto px-4 pt-5 pb-10 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <img
            src={Logo}
            alt="Olhei Comprei"
            className="rounded-full shadow-xl"
            width={100}
          />
          <h1 className="text-4xl font-black text-center text-neutral-800 leading-tight">
            PROMOS <br /> OLHEI & COMPREI
          </h1>
          <p className="text-base font-semibold text-center text-neutral-800">
            🔥 Promoções imperdiveis todos os dias! 🔥
          </p>
        </div>

        <a href="https://chat.whatsapp.com/EnFKpPQLoAvHrYJKPN8yqH?mode=ac_t" target="_blank" className="bg-neutral-800 text-white font-semibold rounded-3xl py-3 px-6 text-center text-sm flex items-center gap-2">
          <Users size={18} />
          GRUPO VIP VAGAS LIMITADAS!
        </a>

        <div className="border border-neutral-300 rounded-xl py-5 px-6 text-center flex flex-col items-center gap-5 w-full max-w-sm">
          <h2 className="text-lg font-semibold text-neutral-800">🚨 DISPONÍVEL AGORA! 🚨</h2>
          <div className="text-4xl font-extrabold text-neutral-800">{count} {count < 2 ? 'VAGA' : 'VAGAS'}</div>
          <p className="flex items-center text-sm gap-2 font-medium text-neutral-800">
            <Zap size={18} className="text-yellow-400" />
            NÃO PERCA A CHANCE
            <Zap size={18} className="text-yellow-400" />
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <a href="https://chat.whatsapp.com/EnFKpPQLoAvHrYJKPN8yqH?mode=ac_t" target="_blank" className="bg-gradient-to-r bg-green-500 to-green-600 text-white font-bold rounded-3xl py-4 px-6 text-center w-full max-w-sm animate-scale hover:bg-none hover:bg-green-600 cursor-pointer">
            ENTRAR NO GRUPO VIP AGORA
          </a>
          <p className="text-xs text-neutral-500 text-center">👆 Clique para garantir sua vaga</p>
        </div>

        <div className="flex flex-col items-center border border-neutral-300 py-5 px-4 rounded-xl gap-4 w-full">
          <h2 className="uppercase text-neutral-800 font-semibold">✨ O que você vai receber:</h2>
          <ul className="flex flex-col items-start gap-2">
            <li>
              <span className="flex items-center justify-center text-neutral-900 text-sm text-center">🎯 Promoções excluisvas diárias.</span>
            </li>
            <li>
              <span className="flex items-center justify-center text-neutral-900 text-sm text-center">💰 Cupons de desconto especiais.</span>
            </li>
            <li>
              <span className="flex items-center justify-center text-neutral-900 text-sm text-center">⚡ Alerta de Promoções relâmpagos.</span>
            </li>
          </ul>
        </div>
      </main>

      <Toasts toasts={toasts} />
    </div>
  );
}
