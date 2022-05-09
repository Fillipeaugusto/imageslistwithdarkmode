import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 40px 0;
`;
export const SubmitButton = styled.button`
	background-color: transparent;
	border: none;
`;

export const ContainerTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 40px;
`;

export const BackButtonContainer = styled.div`
	position: absolute;
	margin-right: 16px;
	left: 16px;
	top: 130px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

export const BackButton = styled.button`
	background-color: transparent;
	flex: 1;
	border: none;
	width: 100px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.color};
`;

export const DataContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: flex-start;
`;

export const Image = styled.img`
	max-width: 496px;
	max-height: 496px;
	object-fit: cover;
	width: 100%;
	height: auto;
`;

export const DataContent = styled.div`
	height: 100%;
	max-width: 60%;
	display: flex;
	flex-direction: column;
	margin: 0 30px;
`;

export const ContentName = styled.h2`
	text-transform: capitalize;
	margin-bottom: 10px;
`;

export const ContentAbout = styled.small`
	line-height: 30px;
`;

export const ButtonsBackFowardContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-around;
	margin-top: 100px;
`;

export const ButtonBackAndFoward = styled.button`
	background-color: transparent;
	color: ${(props) => props.color};
	border: none;
	width: 100px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
