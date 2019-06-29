// Style.js

const grid = {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'row',
};

const bigColumnContainer = {
    borderRight: '1px solid lightgrey',
};

const bigColumn = {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'row',
};

const column = {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    borderRight: '1px solid lightgrey',
    paddingLeft: '10px',
    paddingRight: '10px',
};

export default { grid, bigColumnContainer, bigColumn, column };