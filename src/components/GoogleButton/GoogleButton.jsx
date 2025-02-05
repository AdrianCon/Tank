export default function GoogleButton({src, alt, redirect}) {
  return (
    <button
      style={{ backgroundColor: "black", borderRadius: "50%", padding: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}
      onClick={() => window.open(redirect,"_self")}
    >
      <img
        src={src}
        alt={alt}
        width="35px"
      />
    </button>
  )
}