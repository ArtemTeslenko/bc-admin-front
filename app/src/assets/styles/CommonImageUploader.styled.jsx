import styled from "styled-components";

export const CommonUploaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 100px;
  align-items: center;

  &.mt20 {
    margin-top: 20px;
  }

  &.mb20 {
    margin-bottom: 20px;
  }
`;

export const CommonUploaderActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 100%;
`;

export const CommonUploaderInput = styled.input`
  display: none;
`;

export const CommonUploaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  background-color: transparent;
  padding: 8px 20px;
  border-top: 1px dashed #7dbcbc;
  border-bottom: 1px dashed #7dbcbc;
  border-left: 1px dashed #7dbcbc;
  border-radius: 4px 0 0 4px;
  cursor: pointer;

  & > .uploader__icon {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
  }
`;

export const CommonUploaderPreview = styled.div`
  width: 90px;
  height: 60px;
  border: 1px dashed #7dbcbc;
  border-radius: 4px;

  & > img {
    display: block;
    width: 100px;
    height: 50px;
    border-radius: 4px;
  }
`;

export const CommonUploaderInterim = styled.div`
  position: relative;
`;
