import { useSelector } from "react-redux";
import { StyledIcon } from "../../css/custom";

const ReportIcon = () => {
  const { theme } = useSelector((state) => state?.common);

  return (
    <StyledIcon darkMode={theme}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M9.99999 3.20094C8.4357 3.56358 6.99691 4.33814 5.83287 5.44428C4.66883 6.55041 3.82194 7.94784 3.38002 9.49162C2.93811 11.0354 2.91728 12.6693 3.31968 14.2238C3.72209 15.7784 4.53308 17.1969 5.66854 18.3324C6.804 19.4679 8.22257 20.2788 9.77711 20.6812C11.3316 21.0837 12.9655 21.0628 14.5093 20.6209C16.0531 20.179 17.4505 19.3321 18.5567 18.1681C19.6628 17.004 20.4374 15.5652 20.8 14.0009C20.8 13.7357 20.6946 13.4814 20.5071 13.2938C20.3196 13.1063 20.0652 13.0009 19.8 13.0009H16C15.8182 13.6999 15.455 14.3385 14.9471 14.852C14.4392 15.3656 13.8047 15.7358 13.1077 15.9253C12.4108 16.1148 11.6761 16.1168 10.9781 15.9312C10.2801 15.7455 9.64358 15.3788 9.13286 14.8681C8.62215 14.3574 8.25541 13.7208 8.06976 13.0228C7.88411 12.3248 7.88614 11.5902 8.07563 10.8932C8.26513 10.1963 8.63537 9.56174 9.1489 9.05385C9.66242 8.54596 10.301 8.18274 11 8.00094V4.00094C10.9878 3.88236 10.9522 3.76739 10.8951 3.66273C10.8381 3.55808 10.7607 3.46582 10.6677 3.39136C10.5746 3.3169 10.4676 3.26171 10.353 3.22902C10.2383 3.19632 10.1183 3.18678 9.99999 3.20094Z" />
        <path d="M15 3.5C16.2697 3.94708 17.423 4.6733 18.3748 5.62516C19.3267 6.57702 20.0529 7.73028 20.5 9H16C15.6934 8.64097 15.359 8.3066 15 8V3.5Z" />
      </svg>
    </StyledIcon>
  );
};

export default ReportIcon;