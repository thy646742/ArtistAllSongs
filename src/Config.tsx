const Config = () => {
    const [ disabled, setDisabled ] = React.useState(false);
    
    React.useEffect(() => {
        setDisabled(localStorage.getItem('artist-all-songs-disable-plugin') === 'true');
    }, []);

    const switchOnChange = event => {
        localStorage.setItem('artist-all-songs-disable-plugin', event.target.checked ? 'true' : 'false');
        setDisabled(event.target.checked);
    };

    return (
        <div>
            <input type="checkbox" checked={disabled} onChange={switchOnChange}/>
            &nbsp;
            <span>禁用插件(重载后生效)</span>
            <br/><br/>
            <span>Github仓库地址: <a onClick={()=>betterncm.ncm.openUrl("https://github.com/thy646742/ArtistAllSongs")}>https://github.com/thy646742/ArtistAllSongs</a></span>
        </div>
    );
}

export { Config };