import QRDatasam from "@/assets/images/qr_datasam.svg?url";

const QRScreen = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-4xl font-semibold text-center md:text-5xl">
        ¡Compartí el QR!
      </h2>
      <h4 className="mb-10 text-lg font-semibold text-center md:text-xl">
        Mostrá el QR a tus amigos para que se unan a la comunidad de DATASAM
      </h4>
      <img
        src={QRDatasam}
        alt="QR"
        className="w-full h-full mx-auto md:w-2/3 md:h-2/3 max-w-[600px] max-h-[600px]"
      />
    </div>
  );
};

export default QRScreen;
