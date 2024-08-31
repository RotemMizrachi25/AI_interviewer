import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const RoundButton = styled(Button)(({ theme }) => ({
    borderRadius: '50%', // Makes the button round
    width: '100px',
    height: '100px',
    minWidth: '50px',    // Ensures button remains round
    minHeight: '50px',   // Ensures button remains round
    padding: 0,          // Optional
    boxShadow: theme.shadows[3], // Add shadow for effect
    margin: 50,
    position: "relative",
    fontWeight: 'bold',
    backgroundColor: "darkblue",
    color: "white",
    '&:hover': {
        backgroundColor: '#4169E1', // Change hover color
    },
}));

export default RoundButton;