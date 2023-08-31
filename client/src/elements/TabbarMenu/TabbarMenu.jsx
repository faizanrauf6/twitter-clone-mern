import "./TabbarMenu.css";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
}));

export default function FullWidthTabs({ items }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={`tabbarMenu ${classes.root}`}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="crop and edit image"
        >
          {items.map((item) => {
            return (
              <Tab
                key={item.id}
                icon={item.icon}
                label={item.title}
                {...a11yProps(item.id)}
              />
            );
          })}
        </Tabs>
      </AppBar>

      {items.map((item) => {
        return (
          <TabPanel value={value} index={item.id} dir={"row"} key={item.id}>
            {item["item"]}
          </TabPanel>
        );
      })}
    </div>
  );
}
