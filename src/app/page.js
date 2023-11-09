import Member from "./member.js"

export default function Home() {
  return (
    <>
      <div style={{background: "#ececec", marginTop: "15px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "50%" }}>
          <Member />
        </div>
      </div>
    </>
  )
}
