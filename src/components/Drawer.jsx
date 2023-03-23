import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Drawers = () => {
    const drawerWidth = 249;
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <Drawer
       
        variant="permanent"
        anchor="left"
        sx={{
         backgroundColor:"red"
        }}
        
      >

       
      
     
        <h4 style={{display:"flex",alignSelf:"center",fontSize:"20px",flexWrap:"wrap"}}>Demo Rest </h4>
        <Divider/>
        <List>
          {['Dashboard', 'Menu Manger', 'Team Access','User Feedback',"Setting"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
    </Box>
    </div>
  )
}

export default Drawers
