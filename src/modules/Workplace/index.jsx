import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './styles.css'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import IndividualRuleTable from './IndividualRuleTable';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchElements, fetchCategories, updateCurCategory, clearAnnotation } from './DataSlice.jsx';
import InputBase from '@mui/material/InputBase';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import SearchBar from "material-ui-search-bar";
import Element from "./Element"
import CardContent from '@mui/material/CardContent';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Select from '@mui/material/Select';
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import ListItemIcon from '@mui/material/ListItemIcon';
import CombinedRuleTable from './CombinedRuleTable';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { PieChart } from 'react-minimal-pie-chart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListItemText from '@mui/material/ListItemText';
import HSBar from "react-horizontal-stacked-bar-chart";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FamilyRestroomRounded } from '@mui/icons-material';

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const WorkspaceHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // width: `calc(100% - ${drawerWidth}px)`,
  // necessary for content to be below app bar
}));

const ClassContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: "8px",
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  marginBottom: 2
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const AccountInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const ToolBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1, 2),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const TitleBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  marginBottom: 10
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const ModelName = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: "row",
  alignItems: 'start',
  justifyContent: 'space-between',
  margin: theme.spacing(2, 0),
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const SearchPanel = styled(Paper)(({ theme }) => ({
  padding: 10,
  marginTop: 25,
  marginLeft: 50,
  marginRight: 50
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const WorkspaceSelect = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'space-between',
  margin: theme.spacing(2, 0),
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const StackBarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 80,
  margin: theme.spacing(0, 0),
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const useStyles = makeStyles((theme) => ({
  line: {
    borderBlockColor: "red"
  }
}));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

const Line = styled(Box)((props) => ({
  ...(props.focused && {
    borderRadius: 16,
    border: "thin solid",
    borderColor: "#f48c06"
  }),
  outline: "None",
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 5,
  paddingTop: 3,
  marginBottom: 15
}))

const HistoryText = styled(Box)((props) => ({
  borderRadius: 16,
  border: "thin solid black",
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 3,
  padding: 2.5
}))

function WorkspaceSelectFormControl() {
  return (
    <FormControl sx={{ marginTop: 1, minWidth: 120 }}>
      <Select
        id="workspace-select"
        sx={{ height: "70%" }}
      // value={age}
      // onChange={handleChange}
      >
        <MenuItem value={10}>price</MenuItem>
        <MenuItem value={20}>wiki_animals</MenuItem>
        <MenuItem value={30}>storybook-bias</MenuItem>
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
}

function ModelFormControl() {
  return (
    <FormControl sx={{ marginTop: 1, minWidth: 60, paddingLeft: 2, paddingRight: 2 }}>
      <Select
        id="model-select"
        sx={{ height: "70%" }}
      // value={age}
      // onChange={handleChange}
      >
        <MenuItem value={10}>Model 1</MenuItem>
        <MenuItem value={20}>Model 2</MenuItem>
        <MenuItem value={30}>Model 3</MenuItem>
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
}

function CategoryFormControl(props) {

  const workspace = useSelector(state => state.workspace)
  const dispatch = useDispatch()
  const [selectValue, setSelectValue] = useState()

  return (
    <FormControl sx={{ marginTop: 1, minWidth: 150, padding: 2 }}>
      <Select
        id="label-select"
        sx={{ height: 30 }}
        value={selectValue}
      // onChange={(e) => dispatch(updateCurCategory(e.target.value))}
      >
        <MenuItem value="price">Price</MenuItem>
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
}


function Workspace() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const init_focused_states = {
    L0: false,
    L1: false,
    L2: false,
    L3: false,
    L4: false,
    L5: false
  }

  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [searchInput, setSearchInput] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [focusedState, setFocusedState] = React.useState({ ...init_focused_states, L0: true });
  const [labeledState, setLabeledState] = React.useState({});
  const [numLabel, setNumLabel] = React.useState({ pos: 0, neg: 0 })


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleKeyEvent = (event, len_elements) => {

    console.log("key pressed")

    if (event.key === "ArrowDown") {
      if (focusedIndex < len_elements) {
        var id = "L" + (focusedIndex + 1);
        var old_id = "L" + (focusedIndex);
        var new_state = init_focused_states
        new_state[old_id] = false
        new_state[id] = true
        console.log(`arrow down focused index: ${focusedIndex}`)
        setFocusedState(new_state)
        setFocusedIndex(focusedIndex + 1)
        console.log(`arrow down focused index updated: ${focusedIndex}`)
      }
    } else if (event.key === "ArrowUp") {

      if (focusedIndex > 0) {
        var id = "L" + (focusedIndex - 1);
        var old_id = "L" + (focusedIndex);
        var new_state = init_focused_states
        new_state[old_id] = false
        new_state[id] = true
        console.log(`arrow up focused index: ${focusedIndex}`)
        setFocusedIndex(focusedIndex - 1)
        setFocusedState(new_state)
        console.log(`arrow up focused index updated: ${focusedIndex}`)
      }
    }
  }

  // React.useEffect(() => {
  //   document.addEventListener('keydown', handleKeyEvent)
  // }, []);

  const handleClick = (event, id) => {

    console.log(focusedState)

    if (event.detail == 1) {
      setFocusedIndex(id)
      // document.getElementById("L"+id).focus();
      const LineId = "L" + id
      var new_state = init_focused_states
      new_state[LineId] = true
      setFocusedState(new_state)
    }
  }

  const classes = useStyles();
  const workspace = useSelector(state => state.workspace)

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(clearAnnotation()).then(() => dispatch(fetchElements()))
  }, [])

  const handleSearch = () => {
    const elements = workspace.elements
    console.log(`searching`)
    setSearchResult([])
    var results = []
    elements.map((e) => {
      if (e.includes(searchInput)) {
        results.push(e)
      }
    })
    setSearchResult(results)
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <WorkspaceHeader>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
            <Typography><strong>Label:</strong></Typography>
            <CategoryFormControl />
          </Box>
          <ToolBar>
            <IconButton onClick={handleDrawerOpen}>
              <SearchIcon />
            </IconButton>
          </ToolBar>
        </WorkspaceHeader>
        <TitleBar>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Typography sx={{ fontSize: 30 }}>
            <strong>
              YELP RESTURANT REVIEW
            </strong>
          </Typography>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </TitleBar>
        {/* Temporary */}
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box>
              <Typography sx={{ textAlign: "center", marginBottom: 2, fontSize: 20 }}><strong>Text Data</strong></Typography>
              {
                workspace.elements.map((element, index) => {

                  return (<Element predictScore={ workspace['scores'] != null  ? workspace['scores'][index] : 0} keyEventHandler={(e) => handleKeyEvent(e, index)} focusedState={focusedState} id={index} numLabel={numLabel} numLabelHandler={setNumLabel} clickEventHandler={handleClick} element_id={element['id']} text={element['example']} labeledState={labeledState} LabelStateHandler={setLabeledState} />)
                })
              }
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 30, textAlign: 'center', marginBottom: 5 }}>
                Combined patterns
              </Typography>
              <CombinedRuleTable  />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 5 }}>
              <Typography sx={{ fontSize: 30, textAlign: 'center', marginBottom: 5}}>
                Individual patterns
              </Typography>
              <IndividualRuleTable />
            </Box>

          </Grid>
        </Grid>


        <Drawer
          sx={{
            width: 400,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 400,
              boxSizing: 'border-box',
            }
          }}

          PaperProps={{
            sx: {
              backgroundColor: "#f8f9fa",
            }
          }}

          anchor="right"
          open={open}
          // variant="permanent"
          onClose={handleDrawerClose}
        >
          {/* <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, margin: "0 auto", marginTop: 5 }}
          > */}
          <SearchBar
            style={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, margin: "0 auto", marginTop: 30 }}
            value={searchInput}
            onRequestSearch={() => handleSearch()}
            onChange={(newValue) => setSearchInput(newValue)}
            onCancelSearch={() => setSearchInput("")}
          />
          {/* </Paper> */}

          {
            searchResult.map((r) => {
              return (
                <SearchPanel>
                  <Typography>
                    {r}
                  </Typography>
                </SearchPanel>
              )
            })
          }
        </Drawer>
      </Box>


    </Box>
  );
}

export default {
  routeProps: {
    path: "/",
    element: <Workspace />
  },
  name: 'workspace'
};