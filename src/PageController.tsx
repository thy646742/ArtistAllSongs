const PageController = ({ currentPage, maxPages , onPageChange }) => {
    const [ pageTarget, setPageTarget ] = React.useState(0);
    
    return (
        <div className="m-page m-page-4">
            <a
                className={"zbtn zprv" + (currentPage === 1 ? " js-disabled" : "")}
                onClick={() => onPageChange("prev")}
            >
                <svg>
                    <use xlinkHref="orpheus://orpheus/style/res/svg/icon.sp.svg#page_pre"></use>
                    上一页
                </svg>
            </a>
            <a className="zpgi zpg1 js-selected">
                {currentPage} / {maxPages}
            </a>
            <a
                className={"zbtn znxt" + (currentPage === maxPages ? " js-disabled" : "")}
                onClick={() => onPageChange("next")}
            >
                <svg>
                    <use xlinkHref="orpheus://orpheus/style/res/svg/icon.sp.svg#page_next"></use>
                    下一页
                </svg>
            </a>
            <div
                className="u-lcsch j-flag"
                style={{
                    verticalAlign: "middle",
                    width: "50px",
                    height: "30px",
                    marginLeft: "10px",
                    display: "inline-block"
                }}
            >
                <input
                    id="page-jump"
                    type="text"
                    placeholder="页码"
                    style={{
                        fontSize: "12px",
                        paddingRight: "10px"
                    }}
                    onChange={event => setPageTarget(parseInt(event.target.value, 10))}
                />
            </div>
            <a className="zpgi" onClick={() => onPageChange(pageTarget)}>跳转</a>
        </div>
    );
};

export { PageController };