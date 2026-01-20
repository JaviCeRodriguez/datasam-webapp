import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DATA SAM - Comunidad de Estudiantes de Ciencia de Datos";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";
  const logoSrc = `${baseUrl}images/logo_v_claro_sombra_final.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo/Title Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="DATA SAM Logo"
              width="400"
              height="200"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              maxWidth: "900px",
              lineHeight: "1.4",
              marginTop: "20px",
            }}
          >
            Comunidad de Estudiantes de Ciencia de Datos
          </div>
        </div>

        {/* Stats Section */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              500+
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.8)",
                marginTop: "8px",
              }}
            >
              Estudiantes
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              50+
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.8)",
                marginTop: "8px",
              }}
            >
              Recursos
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              20+
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.8)",
                marginTop: "8px",
              }}
            >
              Materias
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "24px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
          }}
        >
          Donde el conocimiento se comparte y la comunidad se fortalece 🚀
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
