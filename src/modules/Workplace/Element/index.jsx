import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { setLabel, fetchIndividualRules, fetchCombinedRules } from '../DataSlice'
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const Line = styled(Box)((props) => ({
    ...(props.focused && {
        borderRadius: 16,
        border: "thin solid",
        borderColor: "#f48c06"
    }),
    ...(
        props.predictScore > 0.5 && {
            backgroundColor: 'rgba(0, 128, 0, 0.2)'
    }),
    outline: "None",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingTop: 3,
    marginBottom: 15
}))

const useStyles = makeStyles((theme) => ({
    checkicon: {
        color: "green"
    },
    crossicon: {
        color: "red"
    },
    questionicon: {
        color: "grey"
    }
}));

export default function Sentence(props) {

    const { keyEventHandler, focusedState, id, predictScore, numLabel, numLabelHandler, clickEventHandler, text, label, labeledState, LabelStateHandler, element_id } = props

    const dispatch = useDispatch()

    const workspace = useSelector(state => state.workspace)

    const classes = useStyles()

    return (
        <Line tabIndex="-1" predictScore={predictScore} onKeyDown={keyEventHandler} focused={focusedState['L' + id]} id={"L" + id} onClick={(e) => clickEventHandler(e, id)}>
            {focusedState['L' + id] == true &&
                <Stack direction="row" spacing={0} sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={() => {
                        var newState = labeledState
                        if(newState['L' + id] != "pos") {
                           if (newState['L' + id] == "neg") {
                               numLabelHandler({"pos": numLabel['pos']+1, "neg": numLabel['neg']-1})
                           } else {
                            numLabelHandler({...numLabel, "pos": numLabel['pos']+1})
                           }
                        }

                        newState['L' + id] = "pos"
                        LabelStateHandler(newState)
                        dispatch(setLabel({ element_id: element_id, label: 1 })).then(res => {
                            dispatch(fetchIndividualRules()).then( () => {
                                dispatch(fetchCombinedRules())
                            })
                        })
                    }}>
                        <CheckIcon className={classes.checkicon} />
                    </IconButton>
                    <IconButton onClick={() => {
                        var newState = labeledState
                        if(newState['L' + id] != "neg") {
                            if (newState['L' + id] == "pos") {
                                numLabelHandler({"pos": numLabel['pos']-1, "neg": numLabel['neg']+1})
                            } else {
                             numLabelHandler({...numLabel, "neg": numLabel['neg']+1})
                            }
                         }
                        newState['L' + id] = "neg"
                        LabelStateHandler(newState)
                        dispatch(setLabel({ element_id: element_id, label: 0 })).then(res => {
                            dispatch(fetchIndividualRules()).then(() => {
                                dispatch(fetchCombinedRules())
                            })
                        })
                    }}>
                        <CloseIcon className={classes.crossicon} />
                    </IconButton>
                    <IconButton onClick={() => {
                        var newState = labeledState
                        newState['L' + id] = "ques"
                        LabelStateHandler(newState)
                    }}>
                        <QuestionMarkIcon className={classes.questionicon} />
                    </IconButton>
                </Stack>
            }
            <Typography paragraph style={(labeledState['L' + id] == 'pos') ? { color: "blue" } : (labeledState['L' + id] == 'neg') ? { color: "red" } : (labeledState['L' + id] == 'ques') ? { color: "grey" } : {}}>
                {text}
            </Typography>
        </Line>
    );
}