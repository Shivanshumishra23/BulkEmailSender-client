import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../context/Auth";
import { Box, TextField } from "@mui/material";
import OTPVerifyModel from "./OTPVerifyModel";
import { useMutation } from "react-query";
import { forgotPasswordUser } from "../axios/auth";
import { apiError, apiSuccess, customError } from "../utils/apiError";

export default function ForgotModel({ title }) {
  const { open, handleClose, handleClickOpenOtp } = useAuth();

  const [email, setEmail] = React.useState("");
  const mutationForgot = useMutation((data) => forgotPasswordUser(data));
  // const handleForgotPassword
  const handleForgotPassword = async () => {
    try {
      if (!email) {
        customError("Please enter a valid email address ");
        return;
      }
      mutationForgot.mutate({ email });
    } catch (error) {
      apiError(error);
    }
  };

  React.useEffect(() => {
    if (mutationForgot.isError) {
      apiError(mutationForgot.error);
    }
  }, [mutationForgot.isError]);

  React.useEffect(() => {
    if (mutationForgot.isSuccess) {
      apiSuccess("OTP has been sent to your email.");
      handleClickOpenOtp();
    }
  }, [mutationForgot.isSuccess]);

  return (
    <React.Fragment>
      <OTPVerifyModel title="Enter the OTP sent to your email" email={email} />

      <Dialog
        open={open}
        onClose={() => handleClose()}
        sx={{
          borderRadius: 5,
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent
          py={4}
          px={2}
          sx={{
            height: 200,
            // width: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box width={"100%"}>
            <Box>
              <TextField
                label="Enter your email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  mt: 2,
                }}
                variant="contained"
                fullWidth
                color="primary"
                disabled={mutationForgot.isLoading}
                onClick={() => handleForgotPassword()}
              >
                {mutationForgot.isLoading ? "Loading" : "Submit"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
