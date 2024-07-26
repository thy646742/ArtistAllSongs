import { weapi } from './encrypt';
import axios from 'axios';

const AllSongsPage = () => {
    const [ songList, setSongList ] = React.useState([]); 
    const [ currentPage, setCurrentPage] = React.useState(1);
    const [ pageLength, setPageLength ] = React.useState(1000);
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
            try{
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

    return(
        <ul>
            {songList.map(song => (<li>{song.name}</li>))}
        </ul>
    )
}

export { AllSongsPage };