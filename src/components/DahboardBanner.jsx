import { useState } from "react";
import imageUrl from "../utils/ImageUrl";
import { Header,DashboardSidebar } from "./index";

function DashboardBanner() {

  const [open, setOpen] = useState(true);

  return (
    <>
      <section id="banner">
        <div className="bg-image">
          <img src={imageUrl("trending-bg.png")} alt="" />
        </div>
        <Header />
        <DashboardSidebar barOpen={open} barClose={() => setOpen(!open)} />
      </section>
    </>
  );
}

export default DashboardBanner;
