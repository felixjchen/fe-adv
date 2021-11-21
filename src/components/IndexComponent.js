import IndexContext from "../contexts/IndexContext";
import React, { useContext, useState } from "react";
import { Box, Container, Stack, Button } from "@mui/material";

const Index = () => {
  let index_context = useContext(IndexContext);

  let [profile_photo_url, set_profile_photo_url] = useState(
    index_context.profile_photo_url
  );
  const upload_profile_photo = async (file) => {
    const new_profile_photo_url = await index_context.uploadProfilePhoto(file);
    set_profile_photo_url(new_profile_photo_url);
  };

  return (
    <Container fixed>
      <Box>
        <h1>Welcome {index_context.user_email} </h1>

        <Container fixed>
          <Stack style={{ maxWidth: "10rem", margin: "auto" }}>
            <img src={profile_photo_url}></img>
            <Button variant="contained" component="label">
              Upload Profile File
              <input
                type="file"
                onChange={(e) => upload_profile_photo(e.target.files[0])}
                hidden
              />
            </Button>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
};

export default Index;
