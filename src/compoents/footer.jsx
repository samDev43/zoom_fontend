

export function Footer(){
   return (
  <>
    <footer
      className="
        border-t
        border-[#22313A]
        bg-[#0F1720]
        backdrop-blur-xl
        py-6
        mt
      "
    >
      <div
        className="
          lg:w-[80%]
          md:w-[90%]
          w-[95%]
          mx-auto
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
        "
      >

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="
              w-9 h-9
              rounded-xl
              bg-gradient-to-br
              from-[#39F3E2]
              to-[#2ED3C4]
              flex
              items-center
              justify-center
              text-[#0B1215]
              shadow-lg
              shadow-[#39F3E2]/20
            "
          >
            <i className="bi bi-stars"></i>
          </div>

          <span className="text-white font-bold tracking-wide">
            ZOOM
          </span>
        </div>

        {/* Text */}
        <p className="text-[#64748B] text-sm text-center">
          © 2026 Inkwell · Built with care in the dark.
        </p>

        {/* Optional Links */}
        <div className="flex items-center gap-5 text-[#94A3B8] text-sm">
          <a href="#" className="hover:text-[#39F3E2] transition">
            Privacy
          </a>

          <a href="#" className="hover:text-[#39F3E2] transition">
            Terms
          </a>

          <a href="#" className="hover:text-[#39F3E2] transition">
            Contact
          </a>
        </div>

      </div>
    </footer>
  </>
)
}