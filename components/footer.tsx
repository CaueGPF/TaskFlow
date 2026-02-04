export function Footer() {
  return (
    <footer className='w-full border-t border-border bg-background'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row'>
        <p className='text-sm text-muted-foreground'>
          © {new Date().getFullYear()} TaskFlow — Cauê Gonçalves Pestile Fernandes
        </p>

        <p className='text-xs text-muted-foreground'>
          Organize suas tarefas com foco e simplicidade
        </p>
      </div>
    </footer>
  );
}
