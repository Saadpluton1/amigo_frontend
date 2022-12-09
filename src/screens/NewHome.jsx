import {
    Artist,
    Banner,
    Fan,
    Header,
    RecentlyAdded,
    TheUltimate,
    WhatIsAmigoSound
} from "components/New";

import imageUrl from "utils/ImageUrl";

export default function NewHome() {
    return <>
        <Header />
        <main className="custom-new-main">
            <Banner/>
            <div className="container">
                <RecentlyAdded />
            </div>
            <WhatIsAmigoSound/>
            <TheUltimate/>
            <Artist/>
            <Fan/>
            <section className="new-custom-section">
                <div className="container">
                    <div className="playlist-by-genre mb-5">
                        <div className="play-banner-box">
                            <img src={imageUrl('playlist-banner.png')} alt="" />
                            <div className="playlist-ab">
                                <h3>AmigoSoundPlaylists</h3>
                            </div>
                        </div>
                        <div className="genre-list-section">
                            <div className="genre-play-heading">
                                <h3 className="underline-heading">Playlists by Genre</h3>
                                <span className="new-primary-text">{"</>"}</span>
                            </div>
                            <div className="genre-box-main">
                                    <div className="genre-box-inner ">
                                        <img src={imageUrl('electro.png')} alt="" />
                                    </div>
                                    <div className="genre-box-inner">
                                        <img src={imageUrl('dance-off.png')} alt="" />
                                    </div>
                                    <div className="genre-box-inner ">
                                        <div className="text-box">
                                        <h3>Rock</h3>
                                        </div>
                                    </div>
                                    <div className="genre-box-inner">
                                        <img src={imageUrl('hipster.png')} alt="" />
                                    </div>
                                    <div className="genre-box-inner">
                                        <div className="text-box">
                                            <h3>Jazz</h3>
                                        </div>
                                    </div>
                                    <div className="genre-box-inner">
                                        <img src={imageUrl('hipster.png')} alt="" />
                                    </div>
                                    <div className="genre-box-inner ">
                                    <div className="text-box">
                                        <h3>Classic</h3>
                                        </div>
                                    </div>
                                    <div className="genre-box-inner ">
                                    <div className="text-box">
                                        <h3>Rock</h3>
                                        </div>
                                    </div>
                                  
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>
}