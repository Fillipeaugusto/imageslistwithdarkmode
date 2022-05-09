/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { api } from '../../services/api';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { FormEvent, useEffect, useState } from 'react';
import { combineTheme, dark, light } from '../../styles/themes';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Head from 'next/head';
import styled from 'styled-components';
import { Global } from '../../styles/global';
import { useRouter } from 'next/router';
import Link from 'next/link';

const searchImageFormSchema = yup.object().shape({
	search: yup.string().required(),
});

const Container = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 40px 0;
`;
const SubmitButton = styled.button`
	background-color: transparent;
	border: none;
`;

const ContainerTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 40px;
`;

const BackButtonContainer = styled.div`
	position: absolute;
	margin-right: 16px;
	left: 16px;
	top: 130px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const BackButton = styled.button`
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

const DataContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: flex-start;
`;

const Image = styled.img`
	max-width: 496px;
	max-height: 496px;
	object-fit: cover;
	width: 100%;
	height: auto;
`;

const DataContent = styled.div`
	height: 100%;
	max-width: 60%;
	display: flex;
	flex-direction: column;
	margin: 0 30px;
`;

const ContentName = styled.h2`
	text-transform: capitalize;
	margin-bottom: 10px;
`;

const ContentAbout = styled.small`
	line-height: 30px;
`;

const ButtonsBackFowardContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-around;
	margin-top: 100px;
`;

const ButtonBackAndFoward = styled.button`
	background-color: transparent;
	color: ${(props) => props.color};
	border: none;
	width: 100px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export default function Post(data) {
	const cookies = parseCookies();
	const [theme, setTheme] = useState<DefaultTheme>(combineTheme(light));
	const [search, setsearch] = useState('');
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(searchImageFormSchema),
	});
	useEffect(() => {
		if (!cookies.theme) {
			setTheme(combineTheme(light));
		}

		if (cookies.theme === 'light') {
			setTheme(combineTheme(light));
		}
		if (cookies.theme === 'dark') {
			setTheme(combineTheme(dark));
		}
	}, [cookies.theme]);
	const Route = useRouter();

	async function handleSearchImage(event: FormEvent) {
		Route.push(`/post/${search}`);
	}

	function handleRedirect(id?: string) {
		if (id) {
			Route.push(`/post/${id}`);
		} else {
			Route.push(`/`);
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Global />
			<div
				style={{
					display: 'flex',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					margin: '40px 0',
				}}
			>
				<Head>
					<title>{data.data.name}</title>
				</Head>
				<ContainerTitle>
					<span>Álbum do conhecimento</span>
				</ContainerTitle>

				<BackButtonContainer>
					<BackButton
						onClick={() => handleRedirect()}
						color={theme.title === 'light' ? 'black' : 'white'}
					>
						<svg
							width="36"
							height="16"
							viewBox="0 0 36 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M35 8L1 8"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8 1L1 8L8 15"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span>Voltar</span>
					</BackButton>
				</BackButtonContainer>

				<form onSubmit={handleSubmit(handleSearchImage)} className="search-form">
					<div className="search-form-input">
						<input
							className="search-input"
							type="text"
							placeholder="Pesquise aqui"
							value={search}
							name="search"
							{...register('search')}
							onChange={(e) => setsearch(e.target.value)}
						/>

						<SubmitButton type="submit">
							<svg
								width="25"
								height="25"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M15.601 14.2336L11.8041 10.418C16.3666 2.88358 7.17599 -3.20079 1.86036 1.85546C-3.29901 7.66483 3.16036 16.2492 10.4041 11.8242L14.201 15.5367C15.2979 16.743 16.701 15.3367 15.601 14.2336ZM6.44474 1.98671C12.4416 1.98671 12.6354 11.018 6.44474 11.018C0.416615 11.018 0.58849 1.98671 6.44474 1.98671Z"
									fill="#FFFFFF"
								/>
							</svg>
						</SubmitButton>
					</div>
				</form>

				<DataContainer>
					<Image src={data.data.src} alt={data.data.alt} />
					<DataContent>
						<ContentName>{data.data.name}</ContentName>
						<ContentAbout>{data.data.about}</ContentAbout>
					</DataContent>
				</DataContainer>

				<ButtonsBackFowardContainer>
					<ButtonBackAndFoward
						onClick={() => handleRedirect(data.data.prevPost)}
						disabled={data.data.prevPost === data.data.name}
						color={theme.title === 'light' ? 'black' : 'white'}
					>
						<svg
							width="36"
							height="16"
							viewBox="0 0 36 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M35 8L1 8"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8 1L1 8L8 15"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Anterior
					</ButtonBackAndFoward>

					<ButtonBackAndFoward
						onClick={() => handleRedirect(data.data.nextPost)}
						disabled={data.data.nextPost === data.data.name}
						color={theme.title === 'light' ? 'black' : 'white'}
					>
						Próximo
						<svg
							width="36"
							height="16"
							viewBox="0 0 36 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 8L35 8"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M28 1L35 8L28 15"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</ButtonBackAndFoward>
				</ButtonsBackFowardContainer>
			</div>
		</ThemeProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	const { slug } = params;

	const allImages = await api.get('/images').then((response) => {
		return response.data;
	});

	try {
		const data = await api.get(`/images?name=${slug}`).then((response) => {
			let invalidEntries = 0;
			const lastElement = allImages[allImages.length - 1];
			const nextId =
				response.data[0].id === lastElement.id
					? response.data[0].id
					: response.data[0].id + 1;
			const previousId = response.data[0].id === 1 ? 1 : response.data[0].id - 1;

			function filterNextByID(item) {
				if (item.id === nextId) {
					return true;
				}
				invalidEntries++;
				return false;
			}

			function filterPreviousByID(item) {
				if (item.id === previousId) {
					return true;
				}
				invalidEntries++;
				return false;
			}

			const NextItem = allImages.filter(filterNextByID);
			const PreviousItem = allImages.filter(filterPreviousByID);

			return {
				id: response.data[0].id,
				name: response.data[0].name,
				slug: response.data[0].slug,
				src: response.data[0].src,
				alt: response.data[0].alt,
				about: response.data[0].about,
				nextPost: NextItem[0].name,
				prevPost: PreviousItem[0].name,
			};
		});

		return {
			props: {
				data,
			},
		};
	} catch (e) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
};
