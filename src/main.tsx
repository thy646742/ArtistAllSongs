import { Config } from './Config';
import { AllSongsPage } from './AllSongsPage';

plugin.onLoad(() => {
    if(localStorage.getItem('artist-all-songs-disable-plugin') === 'true'){
        console.log('ArtistAllSongs plugin disabled!');
        return;
    }

    window.addEventListener('hashchange', async () => {
        if(!window.location.href.startsWith("orpheus://orpheus/pub/app.html#/m/artist")){
            return;
        }
        const artistId = new URLSearchParams(window.location.href.split('?')[1]).get("id");
        await betterncm.utils.waitForElement('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li');

        if(document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li #allsongs-artistid-' + artistId)){
            console.log('created already');
            return;
        }

        if(document.getElementById('allsongs-tab')){
            document.getElementById('allsongs-tab').remove();
        }
        if(document.getElementById('allsongs-page-root')){
            document.getElementById('allsongs-page-root').remove();
        }
        
        let allSongsText = document.createElement('a');
        allSongsText.className = 'j-flxg';
        allSongsText.id = 'allsongs-artistid-' + artistId;
        allSongsText.innerText = '全部歌曲';
        let allSongsTab = document.createElement('li');
        allSongsTab.appendChild(allSongsText);
        allSongsTab.id = 'allsongs-tab';
        document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li').parentNode.appendChild(allSongsTab);
        console.log('created');

        const root = document.createElement("div");
        root.id = 'allsongs-page-root';
        root.style.display = 'none';
        ReactDOM.render(<AllSongsPage artistId={artistId} />, root);
        document.querySelector('.m-yrsh.g-wrap1.q-lrc').appendChild(root);

        const artistTabs = document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul');
        artistTabs.addEventListener('click', event => {
            const targetTabText = event.target as Element;
            artistTabs.querySelectorAll('.j-flxg').forEach(tabText => {
                console.log(tabText);
                tabText.classList.remove('z-sel');
            });
            targetTabText.classList.add('z-sel');
            const originalPage = document.querySelector(".m-yrsh.g-wrap1.q-lrc div.q-lrc") as HTMLDivElement;
            if(targetTabText.matches('#allsongs-artistid-' + artistId)){
                root.style.display = null;
                originalPage.style.display = 'none';
            }
            else{
                root.style.display = 'none';
                originalPage.style.display = null;
            }
        });
    });
    console.log('ArtistAllSongs loaded complete!')
});

plugin.onConfig(() => {
    const root = document.createElement('div');
    ReactDOM.render(<Config />, root);
    return root;
});