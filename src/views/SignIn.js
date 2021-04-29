import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignInLogo from "../static/quicargo_logo.png"
import {authenticateUser} from "../services/auth-service";
import CenteredProgressLoader from "../shared-components/CenteredProgressLoader";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = (props) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const userChanged = (event) => {
        setUser(event.target.value);
    };

    const passwordChanged = (event) => {
        setPassword(event.target.value);
    };

    const authUser = () => {
        setShowLoader(true);
        authenticateUser(user, password)
            .then(response => {
                if (response.validLogin) {
                    localStorage.setItem('user', user);
                    localStorage.setItem('password', password);
                    props.history.push('/');
                }
            })
            .catch(err => {
                console.error('authenticateUser err: ', err)
            })
            .finally(() => setShowLoader(false))
    };

    const classes = useStyles();

    if(showLoader) {
        return (
            <CenteredProgressLoader/>
        )
    } else {
        return (
            <>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar alt="Sot found" style={{height: '160px', width: '160px', marginBottom: '20px'}} src={SignInLogo}/>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Usuario"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={user}
                                onChange={userChanged}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={passwordChanged}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => authUser()}
                            >
                                Ingresar
                            </Button>
                        </form>
                    </div>
                </Container>
            </>
        );
    }

};

export default SignIn;
