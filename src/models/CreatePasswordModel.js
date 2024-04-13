import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Backdrop, Box, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/Auth";
import { Axios } from "../axios/axios";
import { apiError, apiSuccess, customError } from "../utils/apiError";
import { useNavigate } from "react-router-dom";

function CreatePasswordModel({ title, email }) {
  const navigate = useNavigate();

  const { openCreate, handleCloseCreate } = useAuth();

  const passwordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);

  // const [data, setData] = React.useState({
  //   email: email,
  //   password: "",
  //   confirmPassword: "",
  // });

  const [isLoading, setLoading] = React.useState(false);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   setData({ ...data, [name]: value });
  // };

  const createNewPassword = async () => {
    try {
      const password = passwordRef?.current?.value;
      const confirmPassword = confirmPasswordRef?.current?.value;

      if (!password || !confirmPassword) {
        customError("password required");
        return;
      }

      setLoading(true);
      const resp = await Axios.post("/user/create-password", {
        email,
        password,
        confirmPassword,
      });
      if (resp?.status === 200) {
        apiSuccess(resp?.data?.message);
        setLoading(false);
        handleCloseCreate();
        navigate("/");
      } else {
        setLoading(false);
        apiError("Couldn't create password for user");
      }
    } catch (error) {
      setLoading(false);
      apiError(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openCreate}
        onClose={() => handleCloseCreate()}
        sx={{
          borderRadius: 5,
        }}
        BackdropComponent={(props) => (
          <Backdrop
            {...props}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          />
        )}
      >
        
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent
          py={4}
          px={2}
          sx={{
            height: 200,
            width: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box width={"100%"}>
            <Stack spacing={1} borderRadius={6} sx={{}}>
              <TextField
                label="Enter your  new password"
                type="password"
                variant="outlined"
                fullWidth
                inputRef={passwordRef}
                // value={data?.password}
                // onChange={handleChange}
              />
              <TextField
                label="confirm password"
                type="confirmPassword"
                variant="outlined"
                fullWidth
                inputRef={confirmPasswordRef}
                // value={data?.confirmPassword}
                // onChange={handleChange}
              />
            </Stack>
            <Box>
              <Button
                sx={{
                  mt: 2,
                }}
                variant="contained"
                fullWidth
                color="primary"
                disabled={isLoading}
                onClick={() => createNewPassword()}
              >
                {isLoading ? "Loading" : "Submit"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default React.memo(CreatePasswordModel);
