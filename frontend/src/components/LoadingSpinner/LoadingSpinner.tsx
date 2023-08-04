import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
    return (
        <Box
            mt={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <CircularProgress />
        </Box>
    )
}

export default LoadingSpinner;