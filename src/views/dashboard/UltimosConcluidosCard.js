import PropTypes from 'prop-types';
import { useState } from 'react';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';


// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
// import UltimosConcluidosChartCard from './UltimosConcluidosChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonUltimosConcluidosCard from 'ui-component/cards/Skeleton/SUltimosConcluidosCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// material-ui
import { Card } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

import chartData from './chart-data/bajaj-area-chart';


// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const UltimosConcluidosChartCard = ( { datachart }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.secondary[800];

    useEffect(() => {
        chartData.series[0].data = datachart;
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                Concluídos Hoje
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                                
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        10% Profit
                    </Typography>
                </Grid> */}
            </Grid>
            <Chart {...chartData} />
        </Card>
    );
};


const UltimosConcluidosCard = ({ isLoading, data, dataChartHoje }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonUltimosConcluidosCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Últimos envios</Typography>
                                    </Grid>
                                    {/* <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <UltimosConcluidosChartCard datachart={dataChartHoje}/>
                            </Grid>
                            <Grid item xs={12}>
                                {data.map((e, i) => {
                                    return (
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {e[1]}
                                                        </Typography>
                                                    </Grid>
                                                   
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                {
                                                    (e[5] == "0") ?
                                                            <Typography variant="subtitle2" sx={{ color: '#00a0b2' }}>
                                                            Processamento
                                                        </Typography>
                                                        : (e[5] == "1") ?
                                                            <Typography variant="subtitle2" sx={{ color: 'pink' }}>
                                                                Transito
                                                            </Typography>
                                                            : (e[5] == "2") ?
                                                                <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                                    Concluído
                                                                </Typography>
                                                                :
                                                                <Typography variant="subtitle2" sx={{ color: 'orange.dark' }}>
                                                                    Cancelado
                                                                </Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                                <Divider sx={{ my: 1.5 }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation>
                            Mais
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

UltimosConcluidosCard.propTypes = {
    isLoading: PropTypes.bool
};

export default UltimosConcluidosCard;
