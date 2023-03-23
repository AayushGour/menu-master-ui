import styled from '@emotion/styled';
import { Tooltip, tooltipClasses } from '@mui/material';
import React from 'react';

const MMTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        fontSize: '1rem',
    },
}));

export default MMTooltip;