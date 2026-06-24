export default function StudioPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#1C1914",
        gap: "1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ color: "rgba(245,239,230,0.5)", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Sanity Studio
      </p>
      <h1 style={{ color: "#F5EFE6", fontSize: "28px", fontWeight: 300, margin: 0 }}>
        Open your hosted Studio
      </h1>
      <p style={{ color: "rgba(245,239,230,0.4)", fontSize: "14px", margin: 0 }}>
        Run <code style={{ backgroundColor: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "3px" }}>npx sanity deploy</code> then visit your project at sanity.io/manage
      </p>
    </div>
  );
}
