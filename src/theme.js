import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
    color1: '#222437',
    color2: '#2cc0b1',
};

const theme = createMuiTheme({
    palette: {
        action: {
            hover: 'rgba(8, 173, 157, 0.1)',
            selected: 'rgba(8, 173, 157, 0.2)',
        },
        secondary: {
            main: palette.color2,
        }
    },
    overrides: {
        MuiDialogContent: {
            root: {
                padding: '8px 16px',
            }
        },
        MuiDialogTitle: {
            root: {
                padding: '16px',
            }
        },
        MuiList: {
            root: {
                // backgroundColor: 'red',
            }
        },
        MuiListItem: {
            button: {

            }
        }
    },
//   overrides: {
//       MuiAppBar: {
//           colorPrimary: '#222437!important',
//       }
//   }
});

theme.app = {
    palette
}

export default theme;