interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="header">
      <h1>2FA Manager</h1>
      <button onClick={onAddClick} className="btn">
        Adicionar
      </button>
    </header>
  );
}
