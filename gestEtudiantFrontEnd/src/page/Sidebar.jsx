import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const Sidebar = ({selectedIndex, handleListItemClick}) => {
    const classes = useStyles();

  
    return (
        <>
        <div className={classes.root}>
        <List component="nav">
            <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => {
                    handleListItemClick(event, 0);
                }}
            >
                <ListItemIcon>
                    <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="LISTE"/>
            </ListItem>
            <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => {
                    handleListItemClick(event, 1)
                }}
            >
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="AJOUTER"/>
            </ListItem>
        </List>
        </div>
        </>
    );
}

export default Sidebar;
