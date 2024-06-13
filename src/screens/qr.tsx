import QRDatasam from "@/assets/images/qr_datasam.svg?url";

const QRScreen = () => {
  return (
    <div>
      <h2 className="mb-4 text-4xl font-semibold text-center md:text-5xl">
        ¡Compartí el QR!
      </h2>
      <h4 className="mb-10 text-lg font-semibold text-center md:text-xl">
        Mostrá el QR a tus amigos para que se unan a la comunidad de DATASAM
      </h4>
      <img src={QRDatasam} alt="QR" className="w-1/2 mx-auto h-1/2" />
    </div>
  );
};

export default QRScreen;
