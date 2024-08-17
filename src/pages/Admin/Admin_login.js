import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom-v5-compat";
const isAdmin = true;
const Admin_login = () => {
  const secretKey = useInputValidation("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  if(isAdmin) return <Navigate to="/admin/dashboard"/>
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(255 225 209),rgb(249 159 159))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            <Typography variant="h5">Admin Login</Typography>
            <form
              style={{
                width: "100%",
                margin: "1rem",
              }}
              onSubmit={submitHandler}
            >
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
              />
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </form>
          </>
        </Paper>
      </Container>
    </div>
  );
};

export default Admin_login;
