import { createSlice } from "@reduxjs/toolkit";
import reduxApis from "redux/api";

const trackSlice = createSlice({
    name: "track",
    initialState: {
        loading: false,
        track: null,
        isPlay : false,
        currentSong : 0,
        Song : null
    },
    reducers: {
            setIsPlays: (state, action) => {
              state.isPlay = action.payload;
            },
            setCurrentSongs : (state, action) => {
              state.currentSong = action.payload;
            },
            setSong : (state, action) => {
                state.Song = action.payload;
              },
          },

    extraReducers: {
        [reduxApis.getUniqueTrack.pending]: (state, action) => {
            state.loading = true;
        },
        [reduxApis.getUniqueTrack.fulfilled]: (state, action) => {
            state.loading = false;
            state.track = action.payload;
        },
        [reduxApis.getUniqueTrack.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
export const { setTrack, setIsPlays, setCurrentSongs ,setSong} = trackSlice.actions;

export default trackSlice.reducer;
