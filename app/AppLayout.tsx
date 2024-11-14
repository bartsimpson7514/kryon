import React from "react"
import Navbar from "@/components/shared/navbar/Navbar"
import Footer from "@/components/shared/footer"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light900_dark900 text-light950_dark-950 relative flex min-h-screen flex-col bg-dotsImage bg-cover bg-no-repeat">
      {/* <div className=" absolute -top-14 left-0 right-0 h-full w-full">
        <Image src={"/assets/icons/dots.svg"} alt="" fill />
      </div> */}
      <Navbar />
      <div className="flex ">
        <section className="relative flex flex-1 flex-col pb-6 pt-[4.63rem]">
          <div className="relative w-full">{children}</div>
        </section>
      </div>
      {/* Toaster */}
      <div className=" mt-auto">
        <Footer />
      </div>
    </main>
  )
}

export default AppLayout
