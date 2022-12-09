import axios from "axios";

const createBackendServer = (baseURL) => {
  let user = null; 

  window.addEventListener('storage', () => {
    user = JSON.parse(localStorage.getItem('user'));

  })
  const api = axios.create({
    baseURL,
    headers: { Accept: "application/json" },
    timeout: 60 * 1000,
  });
  
  const headers = {
    "Content-Type": "multipart/form-data"
};

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.message;
      error.message = message ?? error.message;
      if (error?.response?.data?.errors)
        error.errors = error?.response?.data?.errors;
      return Promise.reject(error);
    }
  );

  /***********    GET REQUESTS    **********/
  const getTrack = async (req) => api.get(`/api/track?userId=${user?._id}`);
  const getOneTrack = async (id) => api.get(`/api/track/${id}?userId=${user?._id}`);
  const getNewTrack = async (req) => api.get(`/api/newTrack?userId=${user?._id}`);
  const getAlbums = async (req) => api.get(`/api/artistAlbum?artistId=${user?._id}`);
  const getArtist = async (req) => api.get(`/api/artistByName?name=${req.name}&gender=${req.gender}&genre=${req.genre}`);
  const getOneArtist = async (id) => api.get(`/api/artist/${id}?userId=${user?._id}&artistId=${id}`);
  const getGenre = async (req) => api.get(`/api/genre`);
  const getPlaylist = async (req) => api.get(`/api/playlist?genre=${req?.genre}`);
  const getPlaylistByUser = async (req) => api.get(`/api/playlistUser?artistId=${req?.artistId}&userId=${req?.userId}`);
  const getOnePlayList = async (id) => api.get(`/api/playlist/${id}?userId=${user?._id}`);
  const getPlaylistTrack = async (req) => api.get(`/api/playlistTrack?trackId=${req}`,);
  const getGenreFilter = async (req) => api.get(`/api/genreFilter?genreId=${req?.genreId}`);
  const getWeeklyPlaylist = async (req) => api.get(`/api/weeklPlaylist`);
  const getWeeklyArtist = async (req) => api.get(`/api/weeklyArtist`);
  const getWeeklyAlbum = async (req) => api.get(`/api/album`);
  const getArtistTrack = async (id) => api.get(`/api/allTrackArtist/${id}`);
  const getFavouriteTrack = async ({userId ,artistId}) => api.get(`/api/favouriteTrack?userId=${userId}&artistId=${artistId}`);
  const getUniqueTrack = async (req) => api.get(`/api/uniqueTrack`);
  const getOneAlbum = async (id) => api.get(`/api/album/${id}`);
  const getSearchFilter = async (req) => api.get(`/api/search?search=${req?.search}`);
  const getRecentArtist = async (req) => api.get(`/api/recent-artist`);
  
  /***********    POST REQUESTS    **********/
  const userRegistrations = async (body) => api.post("/api/user", body);
  const login = async (body) => api.post("/api/user/login", body);
  const storeTrack = async body => api.post('/api/track', body,{headers});
  const storePlaylist = async body => api.post('/api/playlist', body);
  const addTrackInPalylist = async body => api.post('/api/addtrackplaylist', body);
  const trackLikes = async body => api.post('/api/tracklikes/'+user?._id, body);
  const trackShares = async body => api.post('/api/trackShares/'+user?._id, body);
  const trackComments = async body => api.post('/api/trackComments', body);
  const playlistComments = async body => api.post('/api/playllstComments', body);
  const artistComments = async body => api.post('/api/artistComments', body);
  const artistLikes = async body => api.post('/api/artistLikes/'+user?._id, body);
  const albumComments = async body => api.post('/api/albumComments', body);
  const albumLikes = async body => api.post('/api/albumLikes/'+user?._id, body);
  const trackListener = async body => api.post('/api/trackListener', body);
  const playlistLikes = async body => api.post('/api/playlistLikes/'+user?._id, body);
  const updateUserProfile = async body => api.put('/api/user/update/'+user?._id, body);
  const updateArtistProfile = async body => api.put('/api/artist/update/'+user?._id, body);
  const userEmailSignUp = async body => api.post('/api/user/create/', body);
  const userEmailPasswordForget = async body => api.post('/api/user/forget/', body);
  const updatePassword = async body => api.post('/api/user/update', body);
  const trackDeleted = async (id) => api.delete(`/api/track/${id}`);
  const updateTrack = async ({id ,form_data}) => api.put('/api/track/update/'+id, form_data);
  const shareCount = async (data) => api.post('/api/trackShares/'+user?._id, data);
  const shareCountPlaylist = async (data) => api.post('/api/playlistShares/'+user?._id, data);
  const shareCountArtist = async (data) => api.post('/api/artistShares/'+user?._id, data);
  const shareCountAlbum = async (data) => api.post('/api/albumShares/'+user?._id, data);
  const trackAddedFavourite = async body => api.post('/api/favouriteTrack', body);
  const storeAlbum = async body => api.post('/api/album', body);
  
  // Admin Request 
 
  const getUser = async (req) => api.get(`/api/user`);
  const getOneUser = async (id) => api.get(`/api/user/${id}`);
  const userSuspend = async (id) => api.put(`/api/user/suspend/${id}`);
  const getArtists = async (id) => api.get(`/api/artistAdmin`);
  const getOneArtists = async (id) => api.get(`/api/artist/${id}`);
  const artistSuspend = async (id) => api.put(`/api/artist/suspend/${id}`);
  const addGenre = async body => api.post('/api/genre', body);
  const getGenreAdmin = async (id) => api.get(`/api/genreAdmin`);
  const genreSuspend = async (id) => api.put(`/api/genre/suspend/${id}`);
  const getAllTrack = async (id) => await api.get(`/api/trackAdmin`);
  const getTotal = async (req) => api.get(`/api/total`);
  const getPlaylistAdmin = async (req) => api.get(`/api/playlistAdmin`);
  const trackTrending = async (id) => api.get(`/api/trackTrending/${id}`);
  const featureArtist = async (id) => api.get(`/api/adminFeatureArtist/${id}`);
  const getFeatureArtist = async (req) => api.get(`/api/featureArtist`);
  const adminUserRegistrations = async (body) => api.post("/api/adminCreate", body);
  const playlistSuspend = async (id) => api.put(`/api/playlist/suspend/${id}`);
  const adminPlaylist = async (id) => api.get(`/api/playlistAdminPersonal/${id}`);
  const updatePlaylist = async ({id, ...data}) => api.put('/api/playlist/update/'+id, data);
  const deleteTrack = async ({id,trackId}) => api.delete(`/api/playlist/delete/${id}?trackId=${trackId}`);

  return {
    userRegistrations,
    login,
    trackTrending,
    storeTrack,
    getTrack,
    getOneTrack,
    getNewTrack,
    getArtist,
    getOneArtist,
    getGenre,
    getGenreFilter,
    storePlaylist,
    getPlaylist,
    getOnePlayList,
    getPlaylistTrack,
    addTrackInPalylist,
    trackLikes,
    trackShares,
    trackComments,
    playlistComments,
    trackListener,
    playlistLikes,
    artistComments,
    artistLikes,
    getWeeklyPlaylist,
    getWeeklyArtist,
    getWeeklyAlbum,
    getUser,
    getOneUser,
    getArtists,
    userSuspend,
    artistSuspend,
    getOneArtists,
    getTotal,
    getAllTrack,
    genreSuspend,
    getGenreAdmin,
    addGenre,
    getPlaylistAdmin,
    featureArtist,
    getFeatureArtist,
    getPlaylistByUser,
    updateUserProfile,
    updateArtistProfile,
    userEmailSignUp,
    userEmailPasswordForget,
    updatePassword,
    adminUserRegistrations,
    playlistSuspend,
    getArtistTrack,
    adminPlaylist,
    trackDeleted,
    updateTrack,
    updatePlaylist,
    deleteTrack,
    shareCount,
    shareCountPlaylist,
    trackAddedFavourite,
    getFavouriteTrack,
    shareCountArtist,
    getUniqueTrack,
    storeAlbum,
    getAlbums,
    getOneAlbum,
    albumLikes,
    albumComments,
    shareCountAlbum,
    getSearchFilter,
    getRecentArtist
  };
};


//const apis = createBackendServer(process.env.NODE_ENV == 'development' ? "http://localhost:5000" : "https://amigobackend.herokuapp.com");

const apis = createBackendServer(process.env.NODE_ENV == 'development' ? "https://amigosound-backend.herokuapp.com/" : "https://amigosound-backend.herokuapp.com/");

export default apis;
