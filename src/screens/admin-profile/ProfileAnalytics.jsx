import React from "react";
import { Header, AdminSideBar } from "../../components";
import imageUrl from "utils/ImageUrl";

function AdminProfileAnalytics() {
  return (
    <>
      <AdminSideBar />
      <section
        id="artist-profile"
        style={{ backgroundImage: `url(${imageUrl("trending-bg.png")})` }}
      >
       </section>
    </>
  );
}

export default AdminProfileAnalytics;
