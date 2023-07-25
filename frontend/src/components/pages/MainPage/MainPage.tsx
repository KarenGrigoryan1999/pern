import { useEffect } from 'react'
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks';
import AuthForm from "../../AuthForm/AuthForm";
import CreateItemForm from "../../CreateItemForm/CreateItemForm";
import CardList from "../../CardList/CardList";
import { whoAmI } from '../../../store/thunks/auth';
import { authSelector } from '../../../store/selectors/auth';
import { LOADING_STATUS } from '../../../store/constants';


function MainPage() {
    const match = useMediaQuery('(min-width:800px)');
    const dispatch = useAppDispatch();

    const { loadingStatus } = useAppSelector(authSelector);

    useEffect(() => {
        dispatch(whoAmI());
    }, [dispatch]);

    return (
        <>
            {
                loadingStatus === LOADING_STATUS.LOADING && (
                    <Box
                        mt={2}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CircularProgress />
                    </Box>
                )
            }
            <Box
                sx={{
                    margin: 'auto',
                    width: `${match ? 60 : 90}%`
                }}
            >
                {
                    (loadingStatus === LOADING_STATUS.FAIL || loadingStatus === LOADING_STATUS.ERROR) && (
                        <AuthForm />
                    )
                }
                {
                    loadingStatus === LOADING_STATUS.SUCCESS && (
                        <>
                            <CreateItemForm />
                            <CardList />
                        </>
                    )
                }
            </Box>
        </>
    )
}

export default MainPage
