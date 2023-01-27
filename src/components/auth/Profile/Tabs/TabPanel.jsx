import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from 'prop-types';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    const style = {
        display: 'flex',
        justifyContent: 'center'
    }
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={style}
        >
            {value === index && (
                <Box sx={{ width: { lg: '30%' } }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default TabPanel;


