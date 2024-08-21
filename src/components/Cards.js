import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useTranslation } from "react-i18next";

export default function InterviewerCards({ func }) {
    const { t } = useTranslation();
    const [selectedField, setSelectedField] = React.useState('');
    const [role, setRole] = React.useState('');

    const fields = ['Software Development', 'Data Science', 'Product Management', 'Marketing', 'Finance'];

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
                                alt="tough interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Chris
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Chris is a highly disciplined and strict interviewer who rigorously evaluates candidates with challenging questions, and unwavering high standards.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleStartSimulation(0)}>{t("start_simulation_card")}</Button>
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
                                image="assets_images/psy_c.png"
                                alt="psychologist interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Nelly
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Nelly is an empathetic behavioral interviewer who focuses on understanding a candidate’s past experiences and actions to assess how they align with the role’s requirements.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleStartSimulation(1)}>{t("start_simulation_card")}</Button>
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
                                image="assets_images/nerd_c.png"
                                alt="nerd interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Sheldon
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Sheldon is a highly analytical technical interviewer who delves deep into candidates' technical skills and problem-solving abilities.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleStartSimulation(2)}>{t("start_simulation_card")}</Button>
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
                                alt="friendly interviewer"
                                sx={{
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    width: '100%',
                                    height: { xs: 'auto', sm: 140 },
                                }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lisa
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lisa is a friendly interviewer who creates a supportive environment, encouraging candidates to feel comfortable while sharing their experiences and qualifications.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleStartSimulation(3)}>{t("start_simulation_card")}</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            {/* Additional Form for Field and Role Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Select Your Field and Role
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
