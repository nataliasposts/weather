import { createTheme, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import SearchInput from "./components/SearchInput";
import { ThemeProvider } from "@emotion/react";
import { useAppDispatch } from "./redux/hooks";
import CurrentWeather from "./components/CurrentWeather";
import ForecastHourly from "./components/ForecastHourly";
import ForecastDaily from "./components/ForecastDaily";
import DiamondIcon from "@mui/icons-material/Diamond";
import { getWeatherForecast } from "./redux/appReducer";

const theme = createTheme({
  typography: {
    fontFamily: "MartianMono",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          borderColor: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&:focus-within .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "greenyellow",
          "&.Mui-focused": {
            color: "greenyellow",
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          "& .MuiGrid-item": {
            paddingLeft: "13px",
          },
        },
      },
    },
  },
});

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const successCallback = (position: any) => {
      dispatch(
        getWeatherForecast({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          city: "",
        })
      );
    };
    const errorCallback = (error: any) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Grid spacing={2} container alignItems="center" flexDirection="column">
          <Grid className="searchInp" item xs={5}>
            <h1 className="title">Weather</h1>
            <SearchInput />
          </Grid>
          <Grid className="searchInp hidden" item xs={5}>
            <h1 className="title">Weather App</h1>
            <SearchInput />
          </Grid>
          <Grid className="gridItem" item xs={5}>
            <CurrentWeather />
          </Grid>
          <Grid className="gridItem" item xs={5}>
            <div className="line"></div>
          </Grid>
          <Grid sx={{ marginBottom: "10px" }} className="gridItem" item xs={5}>
            <ForecastHourly />
          </Grid>
          <Grid className="gridItem" item xs={5}>
            <div className="line"></div>
          </Grid>
          <Grid sx={{ marginBottom: "10px" }} className="gridItem" item xs={5}>
            <ForecastDaily />
          </Grid>
          <Grid className="gridItem" item xs={5}>
            <div className="line"></div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
