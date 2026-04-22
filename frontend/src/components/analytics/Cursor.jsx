const Cursor = ({x, y, width , height}) => { //reciving props from parent component (ChartDashboard.jsx)
    return(
        <rect x={x} y={y} width={width} height={height} rx={5} ry={5} fill={'rgba(0, 0, 0, 0.25)'}/>
    );
};

export default Cursor; //exporting component