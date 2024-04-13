import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Backdrop, Box, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/Auth";
import { Axios } from "../axios/axios";
import { apiError, apiSuccess, customError } from "../utils/apiError";
import CreatePasswordModel from "./CreatePasswordModel";

function OTPVerifyModel({ title, email }) {
  const { openOtp, handleCloseOtp, handleClickOpenCreate } = useAuth();
  const [isLoading, setLoading] = React.useState(false);
  const inputRef = React.useRef(null);

  // const [OTP, setOTP] = React.useState("");

  // const handleForgotPassword
  const handleVerifyOTP = async () => {
    try {
      const otp = inputRef?.current?.value;
      if (!otp) {
        customError("enter OTP");
        return;
      }
      setLoading(true);
      // call axios direct
      const resp = await Axios.post("/user/verify-otp", {
        email: email,
        otp: otp,
      });
      if (resp?.status === 200) {
        apiSuccess(resp?.data);
        handleClickOpenCreate();
        setLoading(false);
      } else {
        apiError("something went wrong!");
      }
    } catch (error) {
      apiError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <CreatePasswordModel title="Enter your new password" email={email} />
      <Dialog
        open={openOtp}
        onClose={() => handleCloseOtp()}
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
            <Box>
              <TextField
                label="Enter the OTP"
                variant="outlined"
                fullWidth
                // value={OTP}
                inputRef={inputRef}

                // onChange={(e) => setOTP(e.target.value)}
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
                disabled={isLoading}
                onClick={() => handleVerifyOTP()}
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

export default React.memo(OTPVerifyModel);
