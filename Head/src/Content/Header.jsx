import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';


const Header = () => {

        return(
        <>

       <Box sx={{ m:4, pl:58 ,  }}>

        <Toolbar>

          <Stack direction="row" spacing={5}>
      <Avatar alt="Remy Sharp" src="https://img.freepik.com/free-vector/hand-drawn-culture-logo-design_23-2149857661.jpg"
       sx={{ width:240, height:200, pl:4, pr:4 }}  />

    </Stack>


                  </Toolbar>

</Box>

{/* <Button variant="contained" disableElevation>
  Register Here
</Button> */}



        </>
    )
}


export default Header;