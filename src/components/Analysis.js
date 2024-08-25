import Typography from "@mui/material/Typography";
import {Button, CardActionArea, CardActions, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import FeelingsAnalysis from "./FeelingsAnalysis";

const Analysis = ({answer, handleNextQuestion, currentQuestionIndex,attention,engagement,pleasantness}) => {
    const { t } = useTranslation();
    const [currentAnswer, setCurrentAnswer] = useState(answer);
    const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Fetch the image blob from the backend
    fetch('http://localhost:5000/media/emotions.png')  // Replace with your actual endpoint
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);  // Create an object URL from the blob
        setImageSrc(url);
      });
  }, [answer]);

    const handleNext = () => {
        setCurrentAnswer({}); // Clear the current answer
        handleNextQuestion();  // Trigger the next question
    };

    useEffect(() => {
        setCurrentAnswer(answer);
    }, [answer]);



    return (
        <>
            <Typography variant="h4" align="center" gutterBottom color="darkblue" fontWeight={900}>
                {t("analysis_title")}
            </Typography>
            <Grid container spacing={2} justifyContent="center" margin="20px" alignItems="stretch">
                <Grid item xs="auto" sm="auto">
                    <Card sx={{maxWidth: 345}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div"
                                            noWrap={false} style={{overflow: 'visible'}}>
                                    {t("disadvantages")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {currentAnswer["disadvantage1"]}
                                    </li>
                                    <li>
                                        {currentAnswer["disadvantage2"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs="auto" sm="auto">
                    <Card sx={{maxWidth: 345}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div">
                                    {t("advantages")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {currentAnswer["advantage1"]}
                                    </li>
                                    <li>
                                        {currentAnswer["advantage2"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs="auto" sm="auto">
                    <Card sx={{maxWidth: 345}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div">
                                    {t("suggestions")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {currentAnswer["suggestion1"]}
                                    </li>
                                    <li>
                                        {currentAnswer["suggestion2"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs="auto" sm="auto">
                    <Card sx={{maxWidth: 345}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="body1" fontWeight={900} component="div">
                                    {t("revised answer")}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <li>
                                        {currentAnswer["revised answer"]}
                                    </li>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            <FeelingsAnalysis attention={attention} engagement={engagement} pleasantness={pleasantness}/>
            {imageSrc ? <img src={imageSrc} alt="Emotions Above 0.65" /> : <p>Loading image...</p>}
            <Grid container justifyContent="center" mt={4}>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Next Question
                </Button>
            </Grid>

        </>
    )
}

export default Analysis;