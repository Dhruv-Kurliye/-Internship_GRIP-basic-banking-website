import React, { useState, useEffect } from 'react';
import { AppBar, Button, IconButton, List, ListItem, Tab, Tabs } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu'
import { ListItemText } from '@material-ui/core';


function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '1em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '1em'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em'
        }
    },

    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'


    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '0px',
        marginLeft: '50px',
        marginRight: '50px',
        height: '45px',
        '&:hover': {
            backgroundColor: "#6564"
        }
    },
    

    drawerIcon: {
        height: '50px',
        width: '50px'
    },
    drawerIconContainer: {
        marginLeft: 'auto',
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    drawer: {
        backgroundColor: " #86df8c"
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.5
    },
    drawerItemEstimate: {
        backgroundColor: " #86df8c"
    },
    drawerItemSelected: {
        '& .MuiListItemText-root': {
            opacity: 1
        }

    },
    appBar: {
        zIndex: theme.zIndex.modal + 1
    }
}));



export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [openDrawer, setOpenDrawer] = useState(false)

    const handleChange = (e, newValue) => {
        props.setValue(newValue);
    }

    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        { name: 'Users', link: '/users', activeIndex: 1 },
        { name: 'AllTranscations', link: '/AllTransactions', activeIndex: 2 },
        { name: 'About us', link: '/Aboutus', activeIndex: 3 },
        { name: 'Create Users', link: '/CreateUser', activeIndex: 4 }
    ];
    useEffect(() => {
        [...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex)
                        if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                            props.setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                case '/estimate':
                    props.setValue(4);
                    break;
                default:
                    break;
            }
        }
        )
    })

    const tabs = (
        <React.Fragment>
     
            <Tabs
                className={classes.tabContainer}
                value={props.value}
                onChange={handleChange}
                indicatorColor='primary'
            >
                {routes.map((route, index) => (
                    <Tab style={{ color: "white" }}
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
            </Tabs>
            <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                component={Link}
                to='/transfer'
                onClick={() => props.setValue(4)}
            >
                Transfer
            </Button>
        </React.Fragment>

    );
    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}
            >
                <div className={classes.toolbarMargin} />
                <List disablePadding >
                    {routes.map(route => (
                        <ListItem
                            key={`${route}${route.activeIndex}`}
                            divider
                            button
                            component={Link}
                            to={route.link}
                            selected={props.value === route.activeIndex}
                            classes={{ selected: classes.drawerItemSelected }}
                            onClick={() => {
                                setOpenDrawer(false);
                                props.setValue(route.activeIndex)
                            }}
                        >
                            <ListItemText disableTypography
                                className={classes.drawerItem}
                            >
                                {route.name}
                            </ListItemText>
                        </ListItem>
                    ))}
                    <ListItem
                        divider
                        button
                        component={Link}
                        to='/transfer'
                        classes={{
                            root: classes.drawerItemEstimate,
                            selected: classes.drawerItemSelected
                        }}
                        onClick={() => {
                            setOpenDrawer(false);
                            props.setValue(4)
                        }}
                        selected={props.value === 4}
                    >
                        <ListItemText
                            className={classes.drawerItem}
                            disableTypography
                        >
                            Transfer
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple

            >
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar disableGutters>
                        <Button
                            className={classes.logoContainer}
                            component={Link}
                            to='/'
                            onClick={() => props.setValue(0)}
                            disableRipple
                        >
                            {/* <img alt='company logo' src={logo} className={classes.logo}/> */}
                        </Button>

                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}
