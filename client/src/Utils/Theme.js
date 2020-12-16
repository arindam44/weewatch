import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  styles: {
    palette: {
      primary: {
        light: "#7986cb",
        main: "#3f51b5",
        dark: "#303f9f",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ec407a",
        main: "#e91e63",
        dark: "#d81b60",
        contrastText: "#fff",
      },
    },
    button: {
      borderRadius: 20,
      textTransform: "none",
      width: "80%",
    },
  },
});

export default theme;
