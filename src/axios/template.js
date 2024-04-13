import { isAuthenticated } from "../utils/api";
import { Axios } from "./axios";
import { useState, useEffect } from "react";

const { token } = isAuthenticated();

export const addTemplate = async (data) => {
  return Axios.post("/template/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
};

export const getAllTemplate = async (data) => {
  return Axios.get("/template/getAll", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// delete the template
export const deleteTemplate = async (id) => {
  return Axios.delete(`/template/delete/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
// get all email based on roles
export const getAllEmailBasedOnRoles = async () => {
  return Axios.get("/allEmail/roles", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

//Dashboard data
// get all email based on roles
export const getDashboardData = async () => {
  return Axios.get("/user/dashboard", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// get all files based on roles
export const getAllFilesBasedOnRoles = async () => {
  return Axios.get("/allFiles/roles", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// get single  template
export const getSingleTemplate = async (id, emailType) => {
  return Axios.get(`/template/single/${id}?ref=${emailType}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// upload and send email
export const uplaodFileAndSendMail = async (data) => {
  return Axios.post("/upload/file", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
};

// Edit template with the specified ID and
export const editTemplateWithId = async ({ _id, subject, template }) => {
  return Axios.patch(
    `/template/edit/${_id}`,
    {
      subject,
      template,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
