import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 },
    background: '#189ab4',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = React.forwardRef(
    (
        {
            border = false,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    marginTop: '1%',
                    height: '80%',
                    padding: '10px',
                    border: '2px solid',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[300] + 98,
                    ':hover': {
                        boxShadow: boxShadow
                            ? shadow ||
                              (theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)')
                            : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
                {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent
                        sx={contentSX}
                        className={contentClass}
                        style={{ border: 'solid 2px rgb(245 243 243)', borderRadius: '5px', marginTop: '1%', padding: '10px' }}
                    >
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
