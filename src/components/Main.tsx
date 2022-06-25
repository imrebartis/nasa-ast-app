// tslint:disable
import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes/lightTheme';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Table from './Table';
import DatePicker from './DatePicker/DatePicker';
import moment from 'moment';
import PageHeading from './PageHeading';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme { }
}

const useStyles = makeStyles({
  main: {
    maxWidth: '35rem',
    '@media screen and (min-width: 900px)': {
      maxWidth: '50rem',
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fromToField: {
    minWidth: 40,
  },
  picker: {
    border: 'none',
    fontSize: 22,
    marginRight: 16,
    marginLeft: 12,
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
      color: '#AA32FF',
    },
    '&:hover': {
      color: '#E205B4',
    },
  },
  pickerLabel: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50 %)',
    height: ' 1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: ' 1px'
  }
});

export default function Main() {
  const classes = useStyles();
  const [asteroids, setAsteroids] = useState([]);
  const [from, setFrom] = useState(moment.utc().startOf('day'));
  const [to, setTo] = useState(
    moment
      .utc()
      .add(1, 'days')
      .startOf('day'),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAsteroids = async () => {
    try {
      const url =
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${from.format('YYYY-MM-DD')}&end_date=${to.format('YYYY-MM-DD')}&api_key=mVFND6wrcnlM5amtKECgiv9kBg0x6Nt2lS6rW0jI`;
      const response = await fetch(url);
      console.log(response.status);
      const data = (await response.json());
      if (response.status === 200) {
        if (data.near_earth_objects) {
          const asteroidItems = Object.values(data.near_earth_objects).flat();
          setAsteroids(asteroidItems);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setError('network error');
    }
  };

  useEffect(() => {
    fetchAsteroids();
  }, [to, from]);


  return (
    <>
      <Link href="#main-content" sx={{ opacity: 0 }}>Skip to main content</Link>
      <div>
        <ThemeProvider theme={lightTheme}>
          <main data-testid='main' className={classes.main}>
            <PageHeading />
            <Box pt={2} pb={6}>
              <Box display='flex' alignItems='center'>
                <Typography className={classes.fromToField} color='secondary' variant='body2' sx={{ fontSize: 24, fontFamily: 'Arial' }}>
                  From
                </Typography>
                <DatePicker
                  id='nasa-form-from'
                  pickerStyle={classes.picker}
                  defaultDate={from}
                  setDate={(newDate: any) => setFrom(newDate)}
                  minDate={null}
                  labelStyle={classes.pickerLabel}
                  labelText={'from'}
                  maxDate={undefined}
                  isEditable={true}
                />
              </Box>
              <>
                <Box display='flex'>
                  <Typography className={classes.fromToField} color='secondary' variant='body2' sx={{ fontSize: 24, fontFamily: 'Arial' }} pr={2}>
                    To
                  </Typography>
                  <DatePicker
                    id='nasa-form-to'
                    pickerStyle={classes.picker}
                    defaultDate={to}
                    setDate={(newDate: any) => setTo(newDate)}
                    minDate={moment(from).add(1, 'days')}
                    labelStyle={classes.pickerLabel}
                    labelText={'to'}
                    maxDate={undefined}
                    isEditable={true}
                  />
                </Box>
              </>
            </Box>
            <Table loading={loading} error={error} asteroids={asteroids} />
          </main>
        </ThemeProvider>
      </div>
    </>
  );
}
