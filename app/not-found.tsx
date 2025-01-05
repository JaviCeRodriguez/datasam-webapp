import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, pero la página que buscas no existe.</p>
      <Link href="/">Volver al inicio</Link>
    </div>
  );
}
