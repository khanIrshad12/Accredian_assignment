"use client";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const defaultTheme = createTheme();

export default function Sign_In() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: {
      error: false,
      errorMessage: "Email is required",
    },
    password: {
      error: false,
      errorMessage: "Password is required",
    },
  });

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: {
        error: false,
        errorMessage: prevErrors[field].errorMessage,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formIsValid = true;

    Object.keys(user).forEach((field) => {
      const value = user[field];

      if (value.trim() === "") {
        formIsValid = false;

        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: {
            error: true,
            errorMessage: prevErrors[field].errorMessage,
          },
        }));
      }
    });

    if (!formIsValid) {
      toast.error("All required fields");
      return;
    }

    try {
      const response = await axios.post("/api/users/signin", user);
      console.log(response)
      if (response.data.error) {
        // Handle specific error messages
        if (response.data.error === "User does not exist") {
          toast.error("User does not exist");
        } else if (response.data.error === "Invalid Password!!") {
          toast.error("Invalid Password!!");
        } else {
          toast.error("Login failed");
        }
      } else if (response.data.success) {
        toast.success(response.data.message);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting");
      console.error("Submit failed", error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
              autoComplete="email"
              autoFocus
              error={errors.email.error}
              helperText={errors.email.error && errors.email.errorMessage}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={user.password}
              onChange={(e) => handleChange("password", e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password.error}
              helperText={errors.password.error && errors.password.errorMessage}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "black" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up "}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
