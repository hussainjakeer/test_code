import { useSelector } from "react-redux";
import { StyledIcon } from "../../css/custom";

const SEOTestIcon = () => {
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
        <path d="M19 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H19C19.2652 8 19.5196 7.89464 19.7071 7.70711C19.8946 7.51957 20 7.26522 20 7V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4Z" />
        <path d="M9 12H5C4.73478 12 4.48043 12.1054 4.29289 12.2929C4.10536 12.4804 4 12.7348 4 13V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H9C9.26522 20 9.51957 19.8946 9.70711 19.7071C9.89464 19.5196 10 19.2652 10 19V13C10 12.7348 9.89464 12.4804 9.70711 12.2929C9.51957 12.1054 9.26522 12 9 12Z" />
        <path d="M14 12H20" />
        <path d="M14 16H20" />
        <path d="M14 20H20" />
      </svg>
    </StyledIcon>
  );
};

export default SEOTestIcon;
