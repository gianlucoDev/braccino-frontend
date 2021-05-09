import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function BigMessage({
  direction = 'column',
  IconComponent,
  message,
  suggestion = null,
  children,
  ...props
}) {
  const textAlignment = direction === 'column' ? 'center' : 'left';

  return (
    <Box
      display="flex"
      flexDirection={direction}
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      {...props}
    >
      <IconComponent style={{ width: '50%', height: '50%' }} />
      <Box>
        <Typography variant="h4" component="p" align={textAlignment}>
          {message}
        </Typography>
        {suggestion && (
          <Typography variant="subtitle1" component="p" align={textAlignment}>
            {suggestion}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default BigMessage;
