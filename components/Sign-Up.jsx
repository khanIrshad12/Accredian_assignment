"use client";
import  {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const defaultTheme = createTheme();

export default function SignUp() {
  const [user, setUser] = useState({
    username: {
      value: "",
      error: false,
      errorMessage: "You must enter a username",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter an email address",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "You must enter a password",
    },
    confirmpassword: {
      value: "",
      error: false,
      errorMessage: "You must confirm the password",
    },
  });

  const router = useRouter();

  const handleChange = (field, value) => {
    setUser({
      ...user,
      [field]: {
        value,
        error: false,
        errorMessage: user[field].errorMessage,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formIsValid = true;
    const newUser = {};

    Object.keys(user).forEach((field) => {
      const value = user[field].value;

      if (value.trim() === "") {
        formIsValid = false;

        setUser((prevUser) => ({
          ...prevUser,
          [field]: {
            value,
            error: true,
            errorMessage: user[field].errorMessage,
          },
        }));
      }

      newUser[field] = value;
    });

    if (!formIsValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post("/api/users/signup", newUser);
      if (response.data.error) {
        toast.error(response.data.error); // Display the error message
      } else if (response.data.success) {
        toast.success(response.data.message);
        router.push("/sign-In");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting");
      console.error("Submit failed", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={user.username.value}
              id="username"
              label="Username"
              onChange={(e) => handleChange("username", e.target.value)}
              name="username"
              autoComplete="username"
              autoFocus
              error={user.username.error}
              helperText={user.username.error && user.username.errorMessage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={user.email.value}
              id="email"
              label="Email Address"
              onChange={(e) => handleChange("email", e.target.value)}
              name="email"
              autoComplete="email"
              error={user.email.error}
              helperText={user.email.error && user.email.errorMessage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={user.password.value}
              onChange={(e) => handleChange("password", e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={user.password.error}
              helperText={user.password.error && user.password.errorMessage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm password"
              value={user.confirmpassword.value}
              onChange={(e) => handleChange("confirmpassword", e.target.value)}
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              error={user.confirmpassword.error}
              helperText={
                user.confirmpassword.error && user.confirmpassword.errorMessage
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "black" }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-In" variant="body2">
                  {"Do you have an account? Sign In "}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
