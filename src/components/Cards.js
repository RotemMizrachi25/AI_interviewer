import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useTranslation } from "react-i18next";
import {useEffect} from "react";

export default function InterviewerCards({ func }) {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [selectedField, setSelectedField] = React.useState('');
    const [role, setRole] = React.useState('');

    const fields = [
        "Software Development",
        "Data Science",
        "Product Management",
        "Marketing",
        "Finance",
        "Cybersecurity",
        "Cloud Computing",
        "Artificial Intelligence",
        "Machine Learning",
        "Blockchain",
        "User Experience Design",
        "Network Engineering",
        "Systems Architecture",
        "Technical Support",
        "Sales Engineering",
        "Quality Assurance",
        "Data Analysis",
        "Human Resources",
        "Project Management",
        "Business Analysis"
    ];

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleStartSimulation = (interviewerId) => {
        if (selectedField && role) {
            func({ interviewerId, selectedField, role });
        } else {
            console.log("Please select a field and enter a role before starting the simulation.");
        }
    };

    useEffect(() => {
        // Set the dir attribute on the body tag based on the current language
        document.body.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    }, [i18n.language]);

    useEffect(() => {
        // Update the document or body font based on the language
        document.body.style.fontFamily = i18n.language === 'he' ? 'Varela Round, Tahoma' : 'Default Font';
    }, [i18n.language]);

    return (
        <>
            <Typography variant="h3" align="center" gutterBottom color="darkblue" fontWeight={900}>
                {t("cards_title")}
            </Typography>
            <Grid container spacing={2} justifyContent="center" alignItems="center" margin="20px">
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/tought_c.png"
                                alt="tough interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent sx={{ minHeight: 140 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t("Chris")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t("Chris_ex")}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleStartSimulation(0)}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/psy_c.png"
                                alt="psychologist interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent sx={{ minHeight: 140 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t("Nelly")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t("Nelly_ex")}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleStartSimulation(1)}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/nerd_c.png"
                                alt="nerd interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent sx={{ minHeight: 140 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t("Sheldon")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t("Sheldon_ex")}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleStartSimulation(2)}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ maxWidth: 345, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="assets_images/friendly_c.png"
                                alt="friendly interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent sx={{ minHeight: 140 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t("Lisa")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t("Lisa_ex")}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ mt: 'auto' }}>
                                <Button size="small" onClick={() => handleStartSimulation(3)}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            {/* Additional Form for Field and Role Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    {t("selectRole_title")}
                </Typography>

                <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id="field-label">Field</InputLabel>
                    <Select
                        labelId="field-label"
                        value={selectedField}
                        label="Field"
                        onChange={handleFieldChange}
                    >
                        {fields.map((field) => (
                            <MenuItem key={field} value={field}>
                                {field}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Role"
                    variant="outlined"
                    value={role}
                    onChange={handleRoleChange}
                    sx={{ minWidth: 300 }}
                    placeholder="Enter the role you're interviewing for"
                />
            </div>
        </>
    );
}
