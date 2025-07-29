export interface Toast {
  id: number;
  message: string;
}

export function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-neutral-900 text-white px-4 py-2 rounded-md text-base shadow animate-slide-in"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
