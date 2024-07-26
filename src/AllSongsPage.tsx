import { weapi } from './encrypt';
import axios from 'axios';

const AllSongsPage = () => {
    const [ songList, setSongList ] = React.useState([]);
    const [ currentPage, setCurrentPage ] = React.useState(1);
    const [ pageLength, setPageLength ] = React.useState(20);
    const artistId = new URLSearchParams(window.location.href.split('?')[1]).get("id");

    const data = {
        id: artistId,
        order: "hot",
        offset: (currentPage - 1) * 30,
        limit: pageLength,
        csrf_token: '',
        private_cloud: true,
        work_type: 1,
    };

    React.useEffect(() => {
        const sendRequest = async () => {
            const encryptedData = weapi(data);
            const requestConfig = {
                method: "POST",
                url: "http://music.163.com/weapi/v1/artist/songs",
                data: new URLSearchParams(encryptedData).toString()
            };
            try {
                const response = await axios(requestConfig);
                setSongList(response.data.songs);
            } catch (error) {
                setSongList(["Error!"]);
            }
        }
        sendRequest();
    }, []);

    React.useEffect(() => {
        console.log(songList);
    });

    // It seems like the data-res like attributes are for providing parameters for interactions
    // But some of them are also detected for styling...

    return (
        <div className="m-plylist m-plylist-pl2 m-plylist_playlist m-plylist-sort"
            tabIndex={1000} id="all-songs-list">
            <div className="head sort f-cb j-flag">
                <div className="fix">
                    <div className="th col">
                        <span title="还原默认排序" className="icn-sort-btn">
                            <a className="j-flag"><i></i></a>
                            <a className="f-dn z-def j-flag">
                                <svg className="u-icn u-icn-sort-reset"></svg>
                            </a>
                        </span>
                    </div>
                    <div className="th col">
                        操作
                        <svg className="u-icn u-icn-sort-hvr"></svg>
                        <svg className="u-icn u-icn-sort"></svg>
                    </div>
                </div>
                <div className="flow j-flag">
                    <div className="th col" data-res-action="sort" data-res-field="title">
                        <span>标题 </span>
                    </div>
                    <div className="th col" data-res-action="sort" data-res-field="artist">
                        <span>歌手</span>
                    </div>
                    <div className="th col" data-res-action="sort" data-res-field="album">
                        <span>专辑</span>
                    </div>
                    <div className="th col" data-res-action="sort" data-res-field="duration">
                        <span>时间</span>
                    </div>
                </div>
            </div>
            <ul className="j-flag">
                <div id="all-songs-list-wrapper-1" tabIndex={10000}>
                    <div className="lst fixed-scroll-management" id="all-songs-list-wrapper-2">
                        <div className="pl-di pl-di-1">
                            {
                                songList.map(song => (
                                    <li
                                        className="itm j-item j-impress"
                                        data-res-menu="true"
                                        data-res-type="4"
                                        data-res-id={song.id}
                                    >
                                        <span className="playstate u-micn u-plyst"></span>
                                        <span
                                            title="喜欢"
                                            className="z-off ico z-first u-micn u-micn-love f-cp s-fc3"
                                            data-res-action="like"
                                            data-res-type="4"
                                            data-res-id={song.id}
                                        ></span>
                                        <span
                                            className="z-off ico z-dis"
                                            data-res-action="download"
                                            data-res-type="4"
                                            data-res-id={song.id}
                                        >
                                            <span className="u-micn u-micn-dld f-cp s-fc3"></span>
                                        </span>
                                        <div className="flow">
                                            <div className="td col title">
                                                <span className="tit s-fc1" title={song.name}>
                                                    {song.name}
                                                </span>
                                            </div>
                                            <div className="td col ellipsis s-fc3 f-pr" title={song.ar.map(author => (author.name)).join(" / ")}>
                                                {
                                                    // This part was helped by chatGPT, I don't know why his works and mine doesn't...
                                                    song.ar.map((author, index, array) => (
                                                        <React.Fragment key={author.id}>
                                                            <a className="s-fc3" href={"#/m/artist/?id=" + author.id}>
                                                                {author.name}
                                                            </a>
                                                            {index < array.length - 1 && ' / '}
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </div>
                                            <div className="td col ellipsis">
                                                <a className="s-fc3" href={"#/m/album/?id=" + song.al.id} title={song.al.name}>
                                                    {song.al.name}
                                                </a>
                                            </div>
                                            <div className="td col s-fc4">
                                                {Math.floor(Math.floor(song.dt / 1000) / 60)}:{String(Math.floor(song.dt / 1000) % 60).padStart(2, '0')}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )

}

export { AllSongsPage };