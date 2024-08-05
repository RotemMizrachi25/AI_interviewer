import {Toolbar, AppBar, Typography, Button, Tabs, Tab} from '@mui/material';
import { cyan } from '@mui/material/colors';
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
// "use client"



const Nav = () => {


    const [value, setValue] = useState(0);

    // Use location to update the tab selection based on the current path
    const location = useLocation();

    // Update the tab selection when the location changes
    useEffect(() => {
        if (location.pathname === "/") {
            setValue(0);
        } else if (location.pathname === "/simulation") {
            setValue(1);
        } else if (location.pathname === "/page1") {
            setValue(2);
        }
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <div>
            <AppBar sx={{background:"#063970"}}>
                <Toolbar>
                    <Typography>AI Interview Assistant</Typography>
                    <Tabs
                        sx={{marginLeft:"auto"}}
                        textColor="inherit"
                        value={value}
                        onChange={(e, value) => handleChange}
                        indicatorColor="primary">
                        <Tab label="Home" component={Link} to="/" />
                        <Tab label="Start" component={Link} to="/simulation" />
                        <Tab label="Page 1" component={Link} to="/page1" />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    )
};
export default Nav;
