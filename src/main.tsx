import { Config } from './ui/config';
import { AllSongsPage } from './AllSongsPage';

plugin.onLoad(async () => {
    new MutationObserver(() => {
        // Check for the tabs
        if(!document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li')){
            console.log('not found');
            return;
        }
        if(document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li #allsongs')){
            console.log('created already');
            return;
        }

        // Create a new tab
        let allSongsText = document.createElement('a');
        allSongsText.className = 'j-flag';
        allSongsText.id = 'allsongs';
        allSongsText.innerText = '全部歌曲';
        let allSongsTab = document.createElement('li');
        allSongsTab.appendChild(allSongsText);
        document.querySelector('.m-yrsh.g-wrap1.q-lrc .u-tab2 ul li').parentNode.appendChild(allSongsTab);
        console.log('created');

        // Render component on click
        allSongsText.addEventListener('click', (event) => {
            event.preventDefault();
            //link add class z-sel
            document.getElementById('allsongs').className = 'j-flag z-sel';
            const contentDiv = document.querySelector('nav.u-tab2.f-ff2.f-cb').nextElementSibling;
            contentDiv.innerHTML = '<div id=all-songs-page-root></div>';
            ReactDOM.render(<AllSongsPage/>, document.getElementById('all-songs-page-root'));
        });
    }).observe(
        await betterncm.utils.waitForElement('.m-yrsh.g-wrap1.q-lrc'), { childList: true, subtree: true }
    );
});

plugin.onConfig(() => {
    const root = document.createElement('div');
    ReactDOM.render(<Config/>, root);
    return root;
});