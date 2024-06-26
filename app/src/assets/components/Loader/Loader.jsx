import {
  LoaderContainer,
  LoaderSpinnerWrapper,
  LoaderSpinner,
} from "@/assets/components/Loader";

export const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <LoaderContainer>
          <LoaderSpinnerWrapper>
            <LoaderSpinner />
          </LoaderSpinnerWrapper>
        </LoaderContainer>
      )}
    </>
  );
};
