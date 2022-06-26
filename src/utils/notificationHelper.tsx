const showMessage = (message: string, variant: string, enqueueSnackbar: any) => {
  // variant could be success, error, warning, info, or default
  enqueueSnackbar(message, {
    variant,
    autoHideDuration: 8000,
    preventDuplicate: true,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  });
};

export default showMessage;
