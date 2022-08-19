// tslint:disable
import React, { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { Theme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Table from './Table';
import DatePicker from './DatePicker/DatePicker';
import moment from 'moment';
import PageHeading from './PageHeading';
import showMessage from 'src/utils/notificationHelper';

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
  snackbarContainer: {
    fontSize: '1.4rem',
    border: 'none',
    borderRadius: '0',
  },
  fromToField: {
    minWidth: 40,
  },
  picker: {
    border: '1px solid #000000',
    borderRadius: '1.25rem',
    borderTopLeftRadius: '1.25rem',
    borderTopRightRadius: '1.25rem',
    borderBottomRightRadius: '1.25rem',
    borderBottomLeftRadius: '1.25rem',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontSize: 18,
    marginRight: 16,
    marginLeft: 12,
    width: '8rem',
    textAlign: 'center',
    height: '1.875rem',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
      borderColor: '#AA32FF',
    },
    '&:hover': {
      borderColor: '#E205B4',
    },
  },
  pickerLabel: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50 %)',
    height: ' 1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
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
  const { enqueueSnackbar } = useSnackbar();

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

          if (moment(to).isAfter(moment(from).add(1, 'days'))) {
            showMessage('End date must be the next day after the start date!', 'error', enqueueSnackbar);
            return;
          }
        }
      }
    } catch (error) {
      console.error(error);
      setError('network error');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAsteroids();
  }, [to, from]);

  return (
    <>
      <Link href="#main-content" sx={{ opacity: 0 }}>Skip to main content</Link>
      <div>
        <main data-testid='main' className={classes.main}>
          <PageHeading />
          <Box pt={2} pb={6}>
            <Box display='flex' alignItems='center' mb={1}>
              <Typography className={classes.fromToField} color='secondary' variant='body2' sx={{ fontSize: 24 }}>
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
                maxDate={moment(to).subtract(1, 'days')}
                isEditable={true}
              />
            </Box>
            <>
              <Box display='flex'>
                <Typography className={classes.fromToField} color='secondary' variant='body2' sx={{ fontSize: 24 }} pr={2}>
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
      </div>
    </>
  );
}
