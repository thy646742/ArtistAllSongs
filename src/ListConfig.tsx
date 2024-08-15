const ListConfig = ({ totalSongs, pageLength, sortingOrder, changePageLengthButtonOnClick, changeOrderButtonOnClick }) => {
    const [ pageLengthTarget, setPageLengthTarget ] = React.useState(0);
    
    const spanStyle = {
        marginRight: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        display: "inline-block",
        verticalAlign: "middle"
    };

    return (
        <div
            id="all-songs-config"
            style={{
                paddingLeft: "20px",
                paddingBottom: "20px"
            }}
        >
            <span style={{...spanStyle, fontWeight: "bold"}}>共{totalSongs}首歌曲</span>
            <br/>
            <span style={spanStyle}>每页{pageLength}首，共{Math.ceil(totalSongs / pageLength)}页</span>
            <div
                className="u-lcsch j-flag"
                style={{
                    verticalAlign: "middle",
                    width: "70px",
                    height: "30px",
                    marginLeft: "10px",
                    display: "inline-block"
                }}
            >
                <input
                    id="page-jump"
                    type="text"
                    placeholder="每页数量"
                    style={{
                        fontSize: "12px",
                        paddingRight: "10px"
                    }}
                    onChange={event => setPageLengthTarget(parseInt(event.target.value, 10))}
                />
            </div>
            <a className="u-ibtn5" onClick={() => changePageLengthButtonOnClick(pageLengthTarget)}>切换每页数量</a>
            <br/>
            <span style={spanStyle}>当前排序：{sortingOrder}</span>
            <a className="u-ibtn5" onClick={changeOrderButtonOnClick}>切换排序方式</a>
        </div>
    );
};

export { ListConfig };