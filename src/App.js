import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, ScrollToTop } from "./components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Signup,
  CreatePassword,
  SignIn,
  Trending,
  Artist,
  ArtistInside,
  New,
  PlayList,
  PlayListInside,
  MyPlayList,
  Genres,
  GenresInside1,
  GenresInside2,
  GenresInside3,
  Charts,
  ChartsInside,
  CompleteTrack,
  AboutUs,
  AdvertiseAmigo,
  Ambassoder,
  AmigoAfiliate,
  AmigoArtist,
  AmigoFans,
  AmigoLabel,
  AmigoReferral,
  Blog,
  BlogInside,
  ContactUs,
  Faq,
  FaqSoon,
  Partners,
  Investors,
  PrivacyPolicy,
  RoadMap,
  Team,
  Terms,
  TokenSale,
  WhitePaper,
  ArtistProfile,
  AdminProfileOverview1,
  AdminProfileAnalytics,
  AdminProfileOverview2,
  TrendingInside,
  Profile,
  AdminUser,
  CreateUser,
  AdminArtist,
  ViewArtist,
  AdminAddTrack,
  AdminTrack,
  AdminGenres,
  AdminAddGenre,
  AdminPlaylist,
  SignInAdmin,
  AdminPlaylistById,
  AddArtists,
  AddUsers,
  Dashboard,
  DashboardMyPlayList,
  ForgetPassword,
  ChangePassword,
  AdminPlaylistEdit,
  MyTrack,
  UpdateTrack,
  MyFavouriteTrack,
  MyAlbum,
  AlbumInside,
  EditTrack
} from "./screens";
import { useEffect } from "react";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import NewHome from "screens/NewHome";
import MyMusic from "screens/MyMusic";
import { Player } from "components/New";


function App() {
  const [data, setData] = useState({ email: '', role: '', password: '', repassword: '' });
  const playerPath = ['/forget','/updatePassword' ,'/signIn-admin','/signup','/sign-in','/create-password']
  const location = useLocation();
  const onChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  useEffect(() => {
    window.dispatchEvent(new Event("storage"))
  }, [])
  return (
    <div className="App">
        {/* <Header /> */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route path="/signIn-admin" element={<SignInAdmin />} />
       
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/updatePassword" element={<ChangePassword />} />

          <Route path="/signup" element={<Signup email={data.email} role={data.role} onChange={onChange} />} />
          <Route path="/create-password" element={<CreatePassword email={data.email} role={data.role} password={data.password} repassword={data.repassword} onChange={onChange} />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/trending-inside/:id" element={<TrendingInside />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/artist-inside/:id" element={<ArtistInside />} />
          <Route path="/new-artist" element={<New />} />
          <Route path="/recommendation" element={<New />} />
          <Route path="/playlist" element={<PlayList />} />
          <Route path="/playlist-inside/:id" element={<PlayListInside />} />
          <Route path="/myplaylist" element={<MyPlayList />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres-inside/:id" element={<GenresInside1 />} />
          <Route path="/genres-inside-2" element={<GenresInside2 />} />
          <Route path="/genres-inside-3" element={<GenresInside3 />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/charts-inside" element={<ChartsInside />} />
          <Route path="/update-track/:id" element={<UpdateTrack />} />
          <Route path="/complete-track" element={<CompleteTrack />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/advertise-amigo" element={<AdvertiseAmigo />} />
          <Route path="/ambassoder" element={<Ambassoder />} />
          <Route path="/amigo-afiliate" element={<AmigoAfiliate />} />
          <Route path="/amigo-artist" element={<AmigoArtist />} />
          <Route path="/amigo-fans" element={<AmigoFans />} />
          <Route path="/amigo-label" element={<AmigoLabel />} />
          <Route path="/amigo-referral" element={<AmigoReferral />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-inside/:id" element={<BlogInside />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/faq-soon" element={<FaqSoon />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/team" element={<Team />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/token-sale" element={<TokenSale />} />
          <Route path="/white-paper" element={<WhitePaper />} />
          <Route path="/album-inside/:id" element={<AlbumInside />} />
          
          {/* //User Route Protected*/}
        
          <Route exact path='/' element={<ProtectedRoute />}>

          <Route path="/dashboard-mytrack" element={<MyTrack />} />
          <Route path="/dashboard-myplaylist" element={<DashboardMyPlayList />} />
          <Route path="/myfavourite" element={<MyFavouriteTrack />} />
          <Route path="/profile" element={<Profile />} />
        
          </Route>
         
         



          {/* //Artist Route Protected*/}
         
          <Route exact path='/' element={<ProtectedRoute />}>

          <Route path="/dashboard-mytrack" element={<MyTrack />} />
          <Route path="/dashboard-myplaylist" element={<DashboardMyPlayList />} />
          <Route path="/myfavourite" element={<MyFavouriteTrack />} />
          <Route path="/dashboard-myalbum" element={<MyAlbum />} />
          <Route path="/artist-profile" element={<ArtistProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-music" element={<MyMusic />} />
       
          </Route>
         
         
          {/* //Admin Route */}

          <Route exact path='/' element={<ProtectedRoute />}>

            <Route path="/admin-user" element={<AdminUser />} />
            <Route path="/admin-profile" element={<AdminProfileOverview1 />} />

            <Route path="/admin-artist" element={<AdminArtist />} />
            <Route path="/admin-track" element={<AdminTrack />} />
            <Route path="/admin-addtrack" element={<AdminAddTrack />} />
            <Route path="/admin-genres" element={<AdminGenres />} />
            <Route path="/admin-addgenres" element={<AdminAddGenre />} />
            <Route path="/admin-all-playlist" element={<AdminPlaylist />} />
            <Route path="/admin-playlist" element={<AdminPlaylistById />} />
            <Route path="/admin-addArtist" element={<AddArtists />} />
            <Route path="/admin-addUser" element={<AddUsers />} />
      
          </Route>

          <Route path="/admin-artistprofile/:id" element={<ViewArtist />} />
          <Route path="/admin-userprofile/:id" element={<CreateUser />} />
          <Route path="/admin-playlist/:id" element={<AdminPlaylistEdit />} />
          <Route path="/edit-music/:id" element={<EditTrack />} />
           
          <Route
            path="/admin-profile-analytics"
            element={<AdminProfileAnalytics />}
          />
          <Route path="/admin-profile-2" element={<AdminProfileOverview2 />} />

        </Routes>
        <Footer />
        {playerPath.includes(location.pathname) ? <></>  : <Player/>}
        <ToastContainer />
    </div>
  );
}
export default App;
