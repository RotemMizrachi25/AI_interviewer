import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const FeelingsAnalysis = ({attention, engagement, pleasantness}) => {
    const { t } = useTranslation();
    let attentionColor = 'green';
    let pleasantnessColor = 'green';
    let engagementColor = 'green';
    if(attention < 50){
        attentionColor = 'red';
    }
    if(pleasantness === 'Negative'){
        pleasantnessColor = 'red';
    }
    else if(pleasantness === 'Neutral'){
        pleasantnessColor = 'black';
    }
    if(engagement === 'Negative'){
        engagementColor = 'red';
    }
    else if(engagementColor === 'Neutral'){
        engagementColor = 'black';
    }



    return(
        <>
            <Grid container spacing={2} justifyContent="center" margin="20px" alignItems="stretch">
                <Grid item xs="auto" sm="auto">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div"
                                            noWrap={false} style={{ overflow: 'visible' }} color={attentionColor}>
                                    {t("Attention")}
                                </Typography>
                                <Typography variant="body1" fontWeight={700} color={attentionColor}>
                                        {attention}%
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs="auto" sm="auto">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} color={engagementColor}
                                            component="div">
                                    {t("engagement")}
                                </Typography>
                                <Typography variant="body1" fontWeight={700} color={engagementColor}>
                                    {engagement}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs="auto" sm="auto">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} color={pleasantnessColor}
                                            component="div">
                                    {t("pleasetness")}
                                </Typography>
                                <Typography variant="body1" fontWeight={700} color={pleasantnessColor}>
                                    {pleasantness}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}

export default FeelingsAnalysis;