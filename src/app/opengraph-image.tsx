import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Maryam Basit — Teacher, Administrator & Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Cached so the image is generated once at build time
async function loadAssets() {
  "use cache";
  const read = (path: string) => readFile(join(process.cwd(), "src/assets", path));
  const [regular, italic, ...art] = await Promise.all([
    read("fonts/Fraunces-Medium.ttf"),
    read("fonts/Fraunces-MediumItalic.ttf"),
    read("art/img2.jpg"),
    read("art/img1.jpg"),
    read("art/img16.jpeg"),
  ]);
  return {
    regular: new Uint8Array(regular),
    italic: new Uint8Array(italic),
    art: art.map((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`),
  };
}

export default async function Image() {
  const { regular, italic, art } = await loadAssets();

  const cards = [
    { left: 20, top: 80, rotate: -9 },
    { left: 140, top: 30, rotate: -1 },
    { left: 260, top: 90, rotate: 8 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          background: "linear-gradient(135deg, #fff8f9 0%, #fdeef2 55%, #f9dde6 100%)",
          color: "#2b1b22",
          fontFamily: "Fraunces",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1, letterSpacing: -2 }}>
            Maryam&nbsp;
            <span style={{ fontStyle: "italic", color: "#b03f66" }}>Basit</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#6b5560" }}>
            Teacher · Administrator · Artist
          </div>
          <div style={{ marginTop: 14, fontSize: 26, color: "#9a8590" }}>
            Klang, Selangor, Malaysia
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", width: 460, height: 420 }}>
          {art.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              width={190}
              height={238}
              style={{
                position: "absolute",
                left: cards[i].left,
                top: cards[i].top,
                objectFit: "cover",
                borderRadius: 22,
                border: "7px solid white",
                transform: `rotate(${cards[i].rotate}deg)`,
                boxShadow: "0 20px 40px rgba(176, 63, 102, 0.25)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: regular.buffer, style: "normal", weight: 500 },
        { name: "Fraunces", data: italic.buffer, style: "italic", weight: 500 },
      ],
    },
  );
}
