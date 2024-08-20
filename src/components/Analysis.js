import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {useTranslation} from "react-i18next";

const Analysis = ({answer}) => {
    const { t } = useTranslation();
    return(
        <>
            <Typography variant="h4" align="center" gutterBottom color="darkblue" fontWeight={900}>
                {t("analysis_title")}
            </Typography>
            <Grid container spacing={2} justifyContent="center" margin="20px" alignItems="stretch">
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div"
                                            noWrap={false} style={{ overflow: 'visible' }}>
                                    {t("disadvantages")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {answer["disadvantage1"]}
                                    </li>
                                    <li>
                                        {answer["disadvantage2"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div">
                                    {t("advantages")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {answer["advantage1"]}
                                    </li>
                                    <li>
                                        {answer["advantage2"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div">
                                    {t("suggestions")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {answer["suggestion1"]}
                                    </li>
                                    <li>
                                        {answer["suggestion2"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div">
                                    {t("revised answer")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {answer["suggestion1"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            </>
    )
}

export default Analysis;