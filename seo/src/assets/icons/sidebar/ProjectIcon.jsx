import { useSelector } from "react-redux";
import { StyledIcon } from "../../css/custom";

const ProjectIcon = () => {
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
        <path d="M10 14L21 3" />
        <path d="M21 3L14.5 21C14.4561 21.0957 14.3857 21.1769 14.2971 21.2338C14.2084 21.2906 14.1053 21.3209 14 21.3209C13.8947 21.3209 13.7916 21.2906 13.703 21.2338C13.6143 21.1769 13.5439 21.0957 13.5 21L10 14L3.00001 10.5C2.90427 10.4561 2.82314 10.3857 2.76626 10.2971C2.70938 10.2084 2.67914 10.1053 2.67914 10C2.67914 9.89468 2.70938 9.79158 2.76626 9.70295C2.82314 9.61431 2.90427 9.54387 3.00001 9.5L21 3Z" />
      </svg>
    </StyledIcon>
  );
};

export default ProjectIcon;
