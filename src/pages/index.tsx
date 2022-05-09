/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Global } from '../styles/global';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { FormEvent, useCallback, useEffect, useState } from 'react';

import { combineTheme, dark, light } from '../styles/themes';
import Switch from 'react-switch';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useImages } from '../services/hooks/useImages';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { Popover } from 'react-tiny-popover';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

const searchImageFormSchema = yup.object().shape({
	search: yup.string().required(),
});
export default function Home() {
	const [theme, setTheme] = useState<DefaultTheme>(combineTheme(light));
	const cookies = parseCookies();
	const [search, setsearch] = useState('');
	const Route = useRouter();
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(searchImageFormSchema),
	});
	const { data, isLoading, isFetching } = useImages();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	async function handleSearchImage(event: FormEvent) {
		Route.push(`/post/${search}`);
	}

	const toggleTheme = () => {
		if (theme.title === 'light') {
			setTheme(combineTheme(dark));

			setCookie(undefined, 'theme', 'dark', {
				maxAge: 60 * 60 * 25 * 30, //30 days
				path: '/',
			});
		}
		if (theme.title === 'dark') {
			setTheme(combineTheme(light));

			setCookie(undefined, 'theme', 'light', {
				maxAge: 60 * 60 * 25 * 30, //30 days
				path: '/',
			});
		}
	};
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

	const Container = styled.div`
		width: 275.92px;
		height: 308px;

		border: none;
		background-color: transparent;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		margin: 10px;
	`;

	const Image = styled.img`
		width: 100%;
	`;

	const SearchContainer = styled.div`
		width: 100%;
		max-width: 598px;
		display: flex;
		border-radius: 50px;
		align-items: center;
		justify-content: center;
		background-color: #565656;
		padding-left: 20px;
		padding-right: 20px;
		margin-bottom: 40px;
	`;

	const Label = styled.label`
		flex: 1;
		padding: 16px;
		/* px="8"; */
		width: 100%;
		/* color:"gray.800"; */
		position: relative;
		/* bgColor="gray.100; */
		border-radius: 50%;
	`;

	const SubmitButton = styled.button`
		background-color: transparent;
		border: none;
	`;

	const LoadingSpinnerDiv = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		max-width: 100%;
		max-height: 100%;
	`;

	const CardContainer = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 30px;
		margin-top: 30px;
	`;

	const ContainerTitle = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 40px;
	`;

	const PopoverContainer = styled.div`
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 60px;
		margin-top: 10px;
	`;

	const PopoverContent = styled.div`
		width: 157px;
		height: auto;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.color};
		background-color: ${(props) => props.backgroundColor};
	`;

	const PopoverLabel = styled.div`
		font-size: 18px;
		margin-top: 10px;
		margin-bottom: 10px;
		font-weight: 500;
	`;

	return (
		<ThemeProvider theme={theme}>
			<Global />
			<PopoverContainer>
				<Popover
					isOpen={isPopoverOpen}
					positions={['bottom']}
					content={
						<PopoverContent
							color={theme.title === 'dark' ? 'black' : 'white'}
							backgroundColor={theme.title === 'dark' ? '#FFF' : '#000'}
						>
							<PopoverLabel>Modo Dark</PopoverLabel>

							<Switch
								offColor="#9B9B9B"
								onColor="#000000"
								height={21}
								width={55}
								checked={theme.title === 'dark' || cookies.theme === 'dark'}
								onChange={toggleTheme}
							/>

							<PopoverLabel>
								{theme.title === 'dark' ? 'Ativado' : 'Desativado'}
							</PopoverLabel>
						</PopoverContent>
					}
				>
					<div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
						<svg
							width="35"
							height="35"
							viewBox="0 0 35 35"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.5002 21.7273C19.8349 21.7273 21.7275 19.8346 21.7275 17.5C21.7275 15.1653 19.8349 13.2727 17.5002 13.2727C15.1656 13.2727 13.2729 15.1653 13.2729 17.5C13.2729 19.8346 15.1656 21.7273 17.5002 21.7273Z"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2.81818"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M27.9273 21.7273C27.7397 22.1523 27.6837 22.6237 27.7666 23.0808C27.8495 23.5379 28.0674 23.9597 28.3923 24.2918L28.4768 24.3764C28.7388 24.6381 28.9467 24.9489 29.0885 25.291C29.2304 25.6332 29.3034 25.9999 29.3034 26.3702C29.3034 26.7406 29.2304 27.1073 29.0885 27.4494C28.9467 27.7915 28.7388 28.1024 28.4768 28.3641C28.2151 28.6261 27.9043 28.834 27.5621 28.9758C27.22 29.1176 26.8533 29.1906 26.483 29.1906C26.1126 29.1906 25.7459 29.1176 25.4038 28.9758C25.0616 28.834 24.7508 28.6261 24.4891 28.3641L24.4045 28.2795C24.0725 27.9547 23.6507 27.7368 23.1936 27.6539C22.7365 27.571 22.265 27.627 21.84 27.8145C21.4232 27.9932 21.0678 28.2898 20.8174 28.6678C20.5671 29.0458 20.4327 29.4888 20.4309 29.9423V30.1818C20.4309 30.9292 20.134 31.6461 19.6055 32.1746C19.077 32.7031 18.3602 33 17.6127 33C16.8653 33 16.1485 32.7031 15.62 32.1746C15.0915 31.6461 14.7945 30.9292 14.7945 30.1818V30.055C14.7836 29.5886 14.6327 29.1363 14.3613 28.7568C14.0899 28.3773 13.7106 28.0883 13.2727 27.9273C12.8477 27.7397 12.3763 27.6837 11.9192 27.7666C11.4621 27.8495 11.0403 28.0674 10.7082 28.3923L10.6236 28.4768C10.3619 28.7388 10.0511 28.9467 9.70897 29.0885C9.36685 29.2304 9.00013 29.3034 8.62977 29.3034C8.25942 29.3034 7.8927 29.2304 7.55058 29.0885C7.20846 28.9467 6.89764 28.7388 6.63591 28.4768C6.37388 28.2151 6.16602 27.9043 6.0242 27.5621C5.88237 27.22 5.80937 26.8533 5.80937 26.483C5.80937 26.1126 5.88237 25.7459 6.0242 25.4038C6.16602 25.0616 6.37388 24.7508 6.63591 24.4891L6.72045 24.4045C7.0453 24.0725 7.26322 23.6507 7.3461 23.1936C7.42898 22.7365 7.37303 22.265 7.18545 21.84C7.00683 21.4232 6.71025 21.0678 6.3322 20.8174C5.95416 20.5671 5.51115 20.4327 5.05773 20.4309H4.81818C4.07075 20.4309 3.35394 20.134 2.82543 19.6055C2.29691 19.077 2 18.3602 2 17.6127C2 16.8653 2.29691 16.1485 2.82543 15.62C3.35394 15.0915 4.07075 14.7945 4.81818 14.7945H4.945C5.4114 14.7836 5.86373 14.6327 6.24319 14.3613C6.62265 14.0899 6.91169 13.7106 7.07273 13.2727C7.2603 12.8477 7.31625 12.3763 7.23337 11.9192C7.15049 11.4621 6.93257 11.0403 6.60773 10.7082L6.52318 10.6236C6.26116 10.3619 6.05329 10.0511 5.91147 9.70897C5.76964 9.36685 5.69665 9.00013 5.69665 8.62977C5.69665 8.25942 5.76964 7.8927 5.91147 7.55058C6.05329 7.20846 6.26116 6.89764 6.52318 6.63591C6.78491 6.37388 7.09573 6.16602 7.43785 6.0242C7.77997 5.88237 8.14669 5.80937 8.51705 5.80937C8.8874 5.80937 9.25412 5.88237 9.59624 6.0242C9.93836 6.16602 10.2492 6.37388 10.5109 6.63591L10.5955 6.72045C10.9275 7.0453 11.3493 7.26322 11.8064 7.3461C12.2635 7.42898 12.735 7.37303 13.16 7.18545H13.2727C13.6895 7.00683 14.0449 6.71025 14.2953 6.3322C14.5457 5.95416 14.68 5.51115 14.6818 5.05773V4.81818C14.6818 4.07075 14.9787 3.35394 15.5072 2.82543C16.0358 2.29691 16.7526 2 17.5 2C18.2474 2 18.9642 2.29691 19.4928 2.82543C20.0213 3.35394 20.3182 4.07075 20.3182 4.81818V4.945C20.32 5.39843 20.4543 5.84143 20.7047 6.21947C20.9551 6.59752 21.3105 6.89411 21.7273 7.07273C22.1523 7.2603 22.6237 7.31625 23.0808 7.23337C23.5379 7.15049 23.9597 6.93257 24.2918 6.60773L24.3764 6.52318C24.6381 6.26116 24.9489 6.05329 25.291 5.91147C25.6332 5.76964 25.9999 5.69665 26.3702 5.69665C26.7406 5.69665 27.1073 5.76964 27.4494 5.91147C27.7915 6.05329 28.1024 6.26116 28.3641 6.52318C28.6261 6.78491 28.834 7.09573 28.9758 7.43785C29.1176 7.77997 29.1906 8.14669 29.1906 8.51705C29.1906 8.8874 29.1176 9.25412 28.9758 9.59624C28.834 9.93836 28.6261 10.2492 28.3641 10.5109L28.2795 10.5955C27.9547 10.9275 27.7368 11.3493 27.6539 11.8064C27.571 12.2635 27.627 12.735 27.8145 13.16V13.2727C27.9932 13.6895 28.2898 14.0449 28.6678 14.2953C29.0458 14.5457 29.4888 14.68 29.9423 14.6818H30.1818C30.9292 14.6818 31.6461 14.9787 32.1746 15.5072C32.7031 16.0358 33 16.7526 33 17.5C33 18.2474 32.7031 18.9642 32.1746 19.4928C31.6461 20.0213 30.9292 20.3182 30.1818 20.3182H30.055C29.6016 20.32 29.1586 20.4543 28.7805 20.7047C28.4025 20.9551 28.1059 21.3105 27.9273 21.7273V21.7273Z"
								stroke={theme.title === 'dark' ? '#FFF' : '#101010'}
								strokeWidth="2.81818"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</Popover>
			</PopoverContainer>
			<ContainerTitle>
				<span>Álbum do conhecimento</span>
			</ContainerTitle>

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

			{isLoading || isFetching ? (
				<LoadingSpinnerDiv>
					<img src="/spiner.gif" alt="spinner" style={{ maxWidth: '100px' }} />
				</LoadingSpinnerDiv>
			) : (
				<CardContainer>
					{data.map((image) => {
						return (
							<Container key={image.id}>
								<Link href={`post/${image.name}`}>
									<a>
										<Image src={image.src} alt={image.alt} />
									</a>
								</Link>
							</Container>
						);
					})}
				</CardContainer>
			)}
		</ThemeProvider>
	);
}
