import { weapi } from './encrypt';
import axios from 'axios';
import { PageController } from './PageController';

const AllSongsPage = ({ artistId }) => {
    const [ songList, setSongList ] = React.useState([]);
    const [ currentPage, setCurrentPage ] = React.useState(1);
    const [ pageLength, setPageLength ] = React.useState(20);
    const [ totalSongs, setTotalSongs ] = React.useState(0);

    const data = {
        id: artistId,
        order: 'hot',
        offset: (currentPage - 1) * pageLength,
        limit: pageLength,
        csrf_token: '',
        private_cloud: true,
        work_type: 1,
    };

    React.useEffect(() => {
        const sendRequest = async () => {
            const encryptedData = weapi(data);
            const requestConfig = {
                method: 'POST',
                url: 'http://music.163.com/weapi/v1/artist/songs',
                data: new URLSearchParams(encryptedData).toString()
            };
            try {
                const response = await axios(requestConfig);
                setTotalSongs(response.data.total);
                setSongList(response.data.songs);
            } catch (error) {
                setSongList(['Error!']);
                console.error('Error fetching song list! [ArtistAllSongs]');
            }
        }
        sendRequest();
    }, [ pageLength, currentPage ]);

    const onPageChange = operation => {
        const maxPages = Math.ceil(totalSongs / pageLength);
        if(operation === 'prev' && currentPage != 1){
            setCurrentPage(currentPage - 1);
        }
        if(operation === 'next' && currentPage != maxPages){
            setCurrentPage(currentPage + 1);
        }
        if(operation >= 1 && operation <= maxPages){
            setCurrentPage(operation);
        }
    }

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
                            <ul style={{ counterReset: "tlistorder " + (currentPage - 1) * pageLength }}>
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
                                                        &nbsp;
                                                        {song.tns ? (<>&nbsp;<span className="s-fc4">({song.tns[0]})</span></>) : ""}
                                                        {song.alia.length >= 1 ? (<>&nbsp;<span className="s-fc4">({song.alia[0]})</span></>) : ""}
                                                        {song.fee === 1 ? (<i className="lose u-micn u-micn-vip"></i>) : ""}
                                                        {song.sq && !song.hr ? (<i className="hq u-micn u-micn-sq"></i>) : ""}
                                                        {song.hr ? (<i className="SpriteIcon SpriteIcon_hires"></i>) : ""}
                                                        {song.mv != 0 ? (<i className="u-micn u-micn-mv mv z-off f-cp" data-mvid={song.mv} data-tid={song.id}></i>) : ""}
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
                            </ul>
                        </div>
                    </div>
                    <PageController currentPage={currentPage} maxPages={Math.ceil(totalSongs / pageLength)} onPageChange={onPageChange} />
                </div>
            </ul>
        </div>
    )

}

export { AllSongsPage };