import styled from "styled-components";

export const StyledIcon = styled.div`
  svg {
    stroke: #707275;
    transition: stroke 0.3s;
  }

  li:hover & svg {
    stroke: ${(props) => {
      return props.darkMode ? "#fff" : "#000";
    }};
  }
  a.active & svg {
    stroke: ${(props) => {
      return props.darkMode ? "#fff" : "#fff"; // Change to desired active color
    }};
  }
`;
