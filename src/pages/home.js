import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from 'react-i18next';


export  function Home(){
    const { t } = useTranslation();
    return(
        <>
            <br/>
            <br/>
            <br/>
            <Typography variant="h2" align="center" gutterBottom color="darkblue" fontWeight={900}>
                {t('welcome_message')}
            </Typography>
            <Box

                display="flex"            // This makes the Box a flex container
                justifyContent="center"   // This centers the image horizontally
                sx={{
                    height: '100vh',      // Full viewport height (optional for vertical centering)
                    width: '100%',        // Full width of the page
                    m:0,
                    p:0
                }}
                margin={0}
                padding={0}>
                <Box
                    component="img"
                    alignItems="center"
                    sx={{
                        height: 250,
                        width: "50%",
                        alignItems:'center',
                        maxHeight: { xs: 150, md: 167 },
                        display: 'block',    // Ensures the margin auto works
                        margin: '0',
                        // maxWidth: { xs: 350, md: 250 },
                        padding:'0'
                    }}
                    alt="four interviewers"
                    src="assets_images/fb.png"
                />
            </Box>





        </>
    )
}