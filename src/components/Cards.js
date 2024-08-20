import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions, Grid} from '@mui/material';
import {useTranslation} from "react-i18next";
//rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}

export default function InterviewerCards({func}) {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="h3" align="center" gutterBottom color="darkblue" fontWeight={900}>
                {t("cards_title")}
            </Typography>
            <Grid container spacing={2} justifyContent="center" alignItems="center" margin="20px">
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/tought_c.png"
                                alt="tought interviewer"
                                sx={{
                                    objectFit: 'cover', // This ensures the image covers the area, focusing on the center
                                    objectPosition: 'top',
                                    width: '100%',      // This makes sure the image takes the full width of the container
                                    height: { xs: 'auto', sm: 140}, // Adjust height based on screen size
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=> func({ interviewerId: 0 })}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3} >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/psy_c.png"
                                alt="psychologist interviewer"
                                sx={{
                                    objectFit: 'cover', // This ensures the image covers the area, focusing on the center
                                    objectPosition: 'top',
                                    width: '100%',      // This makes sure the image takes the full width of the container
                                    height: { xs: 'auto', sm: 140}, // Adjust height based on screen size
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=> func({ interviewerId: 1 })}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3} >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/nerd_c.png"
                                alt="nerd interviewer"
                                sx={{
                                    objectFit: 'cover', // This ensures the image covers the area, focusing on the center
                                    objectPosition: 'top',
                                    width: '100%',      // This makes sure the image takes the full width of the container
                                    height: { xs: 'auto', sm: 140}, // Adjust height based on screen size
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=> func({ interviewerId: 2 })}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/friendly_c.png"
                                alt="friendly interviwer"
                                sx={{
                                    objectFit: 'cover', // This ensures the image covers the area, focusing on the center
                                    objectPosition: 'top',
                                    width: '100%',      // This makes sure the image takes the full width of the container
                                    height: { xs: 'auto', sm: 140}, // Adjust height based on screen size
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=> func({ interviewerId: 3})}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </>

    );
}
