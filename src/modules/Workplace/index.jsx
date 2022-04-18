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
import { useDispatch, useSelector } from 'react-redux';
import { fetchElements, fetchCategories, updateCurCategory } from './DataSlice.jsx';
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
import Select from '@mui/material/Select';
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import ListItemIcon from '@mui/material/ListItemIcon';
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
        <MenuItem value={10}>fairytale-bias-val-split</MenuItem>
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

  return (
    <FormControl sx={{ marginTop: 1, minWidth: 150, padding: 2 }}>
      <Select
        id="label-select"
        sx={{ height: 30 }}
        value={workspace.curCategory}
        onChange={(e) => dispatch(updateCurCategory(e.target.value))}
      >
        {
          workspace.categories.map((e) => {
            return (<MenuItem value={e.id}>{e.category_name}</MenuItem>)
          })
        }
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
    dispatch(fetchElements()).then(() => dispatch(fetchCategories()))
  }, [])

  const handleSearch = () => {
    // const elements = workspace.elements
    const elements = [
      "This assignment satisfies learning objective 3 (LO3) as specified in the syllabus. You will apply the interaction theories, design principles, design methods",
      "Please read chapters 1, 3, and 4 of the Klimczak book before attempting to work on this aspect of your project",
      "Also useful are the readings/notes on Needfinding, Personas, Scenario-Based Design, and the MethodsCards",
      "Synthesize what you have learned in Week 1 into at least one persona for your key stakeholder(s)",
      "Please read chapters 1, 3, and 4 of the Klimczak book before attempting to work on this aspect of your project"
    ]
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

      <Box>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          // open={open}
          anchor="left">
          <DrawerHeader>
            <Typography variant="h6" component="div">
              Sleuth
            </Typography>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Stack>
            <AccountInfo>
              <Box sx={{ flexDirection: 'column' }}>
                <Typography sx={{ fontSize: 20 }}>
                  Jack
                </Typography>
                <Typography sx={{ fontSize: 15 }}>
                  jack@gmail.com
                </Typography>
              </Box>
            </AccountInfo>
            <WorkspaceSelect>
              <Typography>Workspace:</Typography>
              <WorkspaceSelectFormControl />
            </WorkspaceSelect>
            <Divider />
            <StackBarContainer>
              {/* <PieChart
              data={[
                { title: 'Postitive', value: 50, color: '#90e0ef' },
                { title: 'Negative', value: 20, color: '#ff758f' },
                { title: 'Unlabeled', value: 20, color: '#f9f7f3' },
              ]}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
              labelStyle={{ fontSize: 9 }}
              animate={true}
            /> */}
              <HSBar
                // showTextIn
                data={[
                  { value: 100 * (numLabel['pos'] / (1.0 * 131)), color: "#99d98c" },
                  { value: 100 * (numLabel['neg'] / (1.0 * 131)), color: "#ff758f" },
                  { value: 10, color: "#f9f7f3" }]} />
            </StackBarContainer>
            <Stack spacing={0} sx={{ marginBottom: 2 }}>
              <ClassContainer>
                <Typography><strong>Positive</strong></Typography>
                <Typography><strong>{numLabel['pos']}</strong></Typography>
              </ClassContainer>
              <ClassContainer>
                <Typography><strong>Negative</strong></Typography>
                <Typography><strong>{numLabel['neg']}</strong></Typography>
              </ClassContainer>
              <ClassContainer>
                <Typography><strong>Total</strong></Typography>
                <Typography><strong>{workspace.elements.length}</strong></Typography>
              </ClassContainer>
            </Stack>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
              <Typography><strong>Model information</strong></Typography>
            </Box>
            <ModelName>
              <Typography>Current classifier:</Typography>
              <Typography>v.2 model</Typography>
            </ModelName>
            <ModelFormControl />
            <Divider />
            {/* <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Typography sx={{ textAlign: "center" }}><strong>Dataset information</strong></Typography>
              <ClassContainer sx={{ marginTop: 2 }}>
                <Typography><strong>Total instance</strong></Typography>
                <Typography><strong>32</strong></Typography>
              </ClassContainer>
              <ClassContainer>
                <Typography><strong>Positive</strong></Typography>
                <Typography><strong>24</strong></Typography>
              </ClassContainer>
              <ClassContainer>
                <Typography><strong>Negative</strong></Typography>
                <Typography><strong>8</strong></Typography>
              </ClassContainer>
            </Box> */}
            <Box>
              <Accordion sx={{ backgroundColor: "grey" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <HistoryText>
                  <Typography sx={{ whiteSpace: "normal" }} paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </Typography>
                </HistoryText> */}
                  <Card>
                    <CardContent>
                      <Typography sx={{ whiteSpace: "normal" }} paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </Typography>
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Stack>
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
        <WorkspaceHeader>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
            <Typography><strong>Label:</strong></Typography>
            <CategoryFormControl />
          </Box>
          <ToolBar>
            <ButtonGroup variant="contained" aria-label="split button" sx={{ mr: 2 }}>
              <Button >Next to label (2/20)</Button>
              <Button>
                <ArrowDropUpIcon />
              </Button>
              <Button>
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <IconButton onClick={handleDrawerOpen}>
              <SearchIcon />
            </IconButton>
          </ToolBar>
        </WorkspaceHeader>
        <TitleBar>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <Typography sx={{ fontSize: 20 }}>
            <strong>
              storybook_sentence_val_split-assipattle_and_the_mester_stoorworm
            </strong>
          </Typography>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </TitleBar>
        <Box>
          {
            workspace.ready ? workspace['elements'].map((element, index) => {
              const len_elements = workspace['elements'].length
              return (<Element keyEventHandler={(e) => handleKeyEvent(e, len_elements)} focusedState={focusedState} id={index} numLabel={numLabel} numLabelHandler={setNumLabel} clickEventHandler={handleClick} element_id={element['id']} text={element['text']} labeledState={labeledState} LabelStateHandler={setLabeledState} />)
            }) :
              <CircularProgress color="secondary" />
          }
        </Box>
        {/* Temporary */}
        <Box>
          <Element keyEventHandler={(e) => handleKeyEvent(e, 5)} focusedState={focusedState} id={0} numLabel={numLabel} numLabelHandler={setNumLabel} clickEventHandler={handleClick} element_id="id1" text="This assignment satisfies learning objective 3 (LO3) as specified in the syllabus. You will apply the interaction theories, design principles, design methods" labeledState={labeledState} LabelStateHandler={setLabeledState} />
          <Element keyEventHandler={(e) => handleKeyEvent(e, 5)} focusedState={focusedState} id={1} numLabel={numLabel} numLabelHandler={setNumLabel} clickEventHandler={handleClick} element_id="id2" text="Please read chapters 1, 3, and 4 of the Klimczak book before attempting to work on this aspect of your project." labeledState={labeledState} LabelStateHandler={setLabeledState} />
          <Element keyEventHandler={(e) => handleKeyEvent(e, 5)} focusedState={focusedState} id={2} numLabel={numLabel} numLabelHandler={setNumLabel} clickEventHandler={handleClick} element_id="id3" text="Also useful are the readings/notes on Needfinding, Personas, Scenario-Based Design, and the MethodsCards." labeledState={labeledState} LabelStateHandler={setLabeledState} />
          <Element keyEventHandler={(e) => handleKeyEvent(e, 5)} focusedState={focusedState} id={3} numLabel={numLabel} numLabelHandler={setNumLabel} clickEventHandler={handleClick} element_id="id4" text="Synthesize what you have learned in Week 1 into at least one persona for your key stakeholder(s)." labeledState={labeledState} LabelStateHandler={setLabeledState} />
          <Element keyEventHandler={(e) => handleKeyEvent(e, 5)} focusedState={focusedState} id={4} numLabel={numLabel} numLabelHandler={setNumLabel} clickEventHandler={handleClick} element_id="id5" text="Note that “log-in functionality” is a trivial task for a mobile app or website, whereas “pointing” or “following along” during co-reading is a non-trivial task." labeledState={labeledState} LabelStateHandler={setLabeledState} />
        </Box>

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

          {/* <SearchPanel>
            <Typography>
              Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
              sapien faucibus et molestie ac.
            </Typography>
          </SearchPanel>

          <SearchPanel>
            <Typography>
              Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
              sapien faucibus et molestie ac.
            </Typography>
          </SearchPanel> */}
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